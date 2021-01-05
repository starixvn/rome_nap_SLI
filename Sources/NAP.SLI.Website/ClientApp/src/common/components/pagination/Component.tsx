import './Component.scss';
import React from 'react';
import Icon from '@mdi/react';
import { mdiPageFirst, mdiPageLast, mdiPagePreviousOutline, mdiPageNextOutline } from '@mdi/js';
import Select from '../select/Select';
import { generateSelectOptions } from '../../utils/SelectUtils';
import { Input, Button, Form } from 'reactstrap';
import { Formik, Field } from 'formik';

type Props = {
  pageSizes: Array<number>;
  pageSize: number;
  pageIndex: number;
  pageChange: (pageIndex: number, pageSize: number, callback: Func) => void;
  total: number;
};

const PaginationComponent: React.FC<Props> = props => {
  const { pageSize, pageSizes, pageIndex, pageChange, total } = props;
  const pageSizeOptions = generateSelectOptions(pageSizes, x => x.toString());
  const pageTotal = Math.ceil(total / pageSize);

  const handlePageSizeChange = (pageSize: number, setFieldValue: Formik.SetFieldValueFunc, handleSubmit: Func) => {
    setFieldValue('pageIndex', 1);
    setFieldValue('pageSize', pageSize);
    handleSubmit();
  };

  const goToPage = (pageIndex: number, setFieldValue: Formik.SetFieldValueFunc, handleSubmit: Func) => {
    setFieldValue('pageIndex', pageIndex);
    handleSubmit();
  };

  const inputStyle = {
    minWidth: '50px',
    width: pageTotal.toString().length * 10
  };

  const initialValues = {
    pageIndex,
    pageSize
  };
  return (
    <Formik
      initialValues={initialValues}
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
          if (values.pageIndex !== pageIndex) {
            setFieldValue('pageIndex', pageIndex);
          }
        }

        if (pageSize !== newPageSize) {
          isCallPageChange = true;
        }

        if (isCallPageChange) {
          pageChange(newPageIndex, newPageSize, () => setSubmitting(false));
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
            <Select options={pageSizeOptions} value={values.pageSize} onChange={selectedOption => handlePageSizeChange(selectedOption.value, setFieldValue, handleSubmit)} inputProps={{
              title: 'Select page size',
              className: 'mr-5'
            }} />
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

export default PaginationComponent;