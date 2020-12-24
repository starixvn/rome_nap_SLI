import './Component.scss';
import React from 'react';
import Icon from '@mdi/react';
import { mdiPageFirst, mdiPageLast, mdiPagePreviousOutline, mdiPageNextOutline } from '@mdi/js';
import { PageSizes, PageSize } from '../../utils/ReportUtils';
import Select from '../select/Select';
import { generateSelectOptions } from '../../utils/SelectUtils';
import { Input, Button, Form } from 'reactstrap';
import { Formik, Field } from 'formik';

type Props = {
  pageSizes: number[];
  pageSize: number;
  pageIndex: number;
  pageChange?: (pageIndex: number, pageSize: number, callback: () => void) => void;
  total: number;
}

const defaultProps: Props = {
  pageSizes: PageSizes,
  pageSize: PageSize,
  pageIndex: 1,
  total: 0
};

const PaginationComponent = (props: Props) => {
  const { pageSize, pageSizes, pageIndex, pageChange, total } = props;
  const pageSizeOptions = generateSelectOptions(pageSizes, x => x.toString());
  const pageTotal = Math.ceil(total / pageSize);

  const getPageSizeOption = (pageSize: number) => pageSizeOptions.filter(x => x.value === pageSize)[0];

  const handlePageSizeChange = (pageSize: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void, handleSubmit: Func) => {
    setFieldValue('pageSize', pageSize);
    setFieldValue('pageSizeOption', getPageSizeOption(pageSize));
    handleSubmit();
  };

  const goToPage = (pageIndex: number, setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void, handleSubmit: Func) => {
    setFieldValue('pageIndex', pageIndex);
    handleSubmit();
  };

  const inputStyle = {
    minWidth: '50px',
    width: pageTotal.toString().length * 10
  };

  return (
    <Formik
      initialValues={{
        pageIndex,
        pageSize,
        pageSizeOption: getPageSizeOption(pageSize)
      }}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        let isCallPageChange = false;
        const newPageIndex = parseInt(values.pageIndex.toString());
        const newPageSize = values.pageSize;
        if (pageIndex !== newPageIndex) {
          if (newPageIndex >= 1 && newPageIndex <= pageTotal) {
            isCallPageChange = !!pageChange;
          } else {
            setFieldValue('pageIndex', pageIndex);
          }
        } else {
          if (values['pageIndex'] !== pageIndex) {
            setFieldValue('pageIndex', pageIndex);
          }
        }

        if (pageSize !== newPageSize) {
          isCallPageChange = true;
        }

        if (isCallPageChange) {
          pageChange && pageChange(newPageIndex, newPageSize, () => setSubmitting(false));
        } else {
          setSubmitting(false);
        }

      }}
    >
      {({
        handleSubmit,
        setFieldValue,
        isSubmitting,
        values
      }) => (
        <Form className='pagination' onSubmit={handleSubmit}>
          <fieldset className='form-inline' disabled={isSubmitting}>
            <Select title='Select page size' className='mr-5' options={pageSizeOptions} value={values.pageSizeOption} onChange={(selectedOption) => handlePageSizeChange(selectedOption.value, setFieldValue, handleSubmit)} />
            <Button type='button' disabled={pageIndex === 1} color='outline-secondary' title='Go to first page' onClick={() => goToPage(1, setFieldValue, handleSubmit)}>
              <Icon path={mdiPageFirst} />
            </Button>
            <Button type='button' disabled={pageIndex === 1} color='outline-secondary' title='Go to previous page' onClick={() => goToPage(pageIndex - 1, setFieldValue, handleSubmit)}>
              <Icon path={mdiPagePreviousOutline} />
            </Button>
            <div className='mx-3'>
              Page <Input name='pageIndex' type="text" autoComplete="off" style={inputStyle} tag={Field} title='Go to page' /> of {pageTotal}
            </div>
            <Button type='button' disabled={pageIndex >= pageTotal} color='outline-secondary' title='Go to next page' onClick={() => goToPage(pageIndex + 1, setFieldValue, handleSubmit)}>
              <Icon path={mdiPageNextOutline} />
            </Button>
            <Button type='button' disabled={pageIndex >= pageTotal} color='outline-secondary' title='Go to last page' onClick={() => goToPage(pageTotal, setFieldValue, handleSubmit)}>
              <Icon path={mdiPageLast} />
            </Button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

PaginationComponent.defaultProps = defaultProps;
export default PaginationComponent;