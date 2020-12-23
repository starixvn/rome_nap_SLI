// @ts-nocheck
import './Component.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiPageFirst, mdiPageLast, mdiPagePreviousOutline, mdiPageNextOutline } from '@mdi/js';
import { PageSizes, PageSize } from '../../utils/ReportUtils';
import Select from '../select/Select';
import { generateSelectOptions } from '../../utils/SelectUtils';
import { Input, Button, Form } from 'reactstrap';
import { Formik, Field } from 'formik';

const propTypes = {
  pageSizes: PropTypes.array,
  pageSize: PropTypes.number,
  pageIndex: PropTypes.number,
  pageChange: PropTypes.func,
  total: PropTypes.number.isRequired
};

const defaultProps = {
  pageSizes: PageSizes,
  pageSize: PageSize,
  pageIndex: 1
};

const PaginationComponent = (props) => {
  const { pageSize, pageSizes, pageIndex, pageChange, total } = props;
  const pageSizeOptions = generateSelectOptions(pageSizes, x => x.toString());
  const pageSizeOption = pageSizeOptions.filter(x => x.value === pageSize)[0];
  const pageTotal = Math.ceil(total / pageSize);

  const handlePageSizeChange = (selectedOption) => {
    pageChange && pageChange(selectedOption.value);
  };

  const goToPage = (index, setFieldValue, handleSubmit) => {
    setFieldValue('pageIndex', index);
    handleSubmit();
  }

  const inputStyle = {
    minWidth: '50px',
    width: pageTotal.toString().length * 10
  };

  return (
    <Formik
      initialValues={{
        pageIndex
      }}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        const newPageIndex = parseInt(values['pageIndex']);
        if (pageIndex !== newPageIndex) {
          if (newPageIndex >= pageIndex && newPageIndex <= pageTotal) {
            pageChange && pageChange(newPageIndex);
          } else {
            setFieldValue('pageIndex', pageIndex);
          }
        } else {
          if (values['pageIndex'] !== pageIndex) {
            setFieldValue('pageIndex', pageIndex);
          }
        }

        setSubmitting(false);
      }}
    >
      {({
        handleSubmit,
        setFieldValue,
        isSubmitting
      }) => (
        <Form className='pagination' onSubmit={handleSubmit}>
          <fieldset className='form-inline' disabled={isSubmitting}>
            <Select title='Select page size' className='mr-5' options={pageSizeOptions} value={pageSizeOption} onChange={handlePageSizeChange} />
            <Button type='button' disabled={pageIndex === 1} color='outline-secondary' title='Go to first page' onClick={goToPage(1, setFieldValue, handleSubmit)}>
              <Icon path={mdiPageFirst} />
            </Button>
            <Button type='button' disabled={pageIndex === 1} color='outline-secondary' title='Go to previous page' onClick={goToPage(pageIndex - 1, setFieldValue, handleSubmit)}>
              <Icon path={mdiPagePreviousOutline} />
            </Button>
            <div className='mx-3'>
              Page <Input name='pageIndex' type="text" autoComplete="off" style={inputStyle} tag={Field} title='Go to page' /> of {pageTotal}
            </div>
            <Button type='button' disabled={pageIndex >= pageTotal} color='outline-secondary' title='Go to next page' onClick={goToPage(pageIndex + 1, setFieldValue, handleSubmit)}>
              <Icon path={mdiPageNextOutline} />
            </Button>
            <Button type='button' disabled={pageIndex >= pageTotal} color='outline-secondary' title='Go to last page' onClick={goToPage(pageTotal, setFieldValue, handleSubmit)}>
              <Icon path={mdiPageLast} />
            </Button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

PaginationComponent.propTypes = propTypes;
PaginationComponent.defaultProps = defaultProps;
export default PaginationComponent;