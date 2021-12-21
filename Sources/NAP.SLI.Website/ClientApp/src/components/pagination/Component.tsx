import './Component.scss';
import React, { useEffect } from 'react';
import Icon from '@mdi/react';
import {
  mdiPageFirst,
  mdiPageLast,
  mdiPagePreviousOutline,
  mdiPageNextOutline,
} from '@mdi/js';
import Select from 'components/select/Select';
import { generateSelectOptionsFromList } from 'utils/SelectUtils';
import { Input, Button, Form } from 'reactstrap';
import { Formik, Field } from 'formik';

type Props = {
  pageSizes: number[];
  pageSize: number;
  pageIndex: number;
  onPageChange: (pageIndex: number, pageSize: number, callback: Func) => void;
  total: number;
};

const PaginationComponent = (props: Props) => {
  const isMounted = React.useRef(false);
  const { pageSize, pageSizes, pageIndex, onPageChange, total } = props;
  const pageSizeOptions = generateSelectOptionsFromList(
    pageSizes,
    (x: number) => x.toString(),
  );
  const pageTotal = Math.ceil(total / pageSize);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handlePageSizeChange = (
    pageSize: number,
    setFieldValue: Formik.SetFieldValueFunc,
    handleSubmit: Func,
  ) => {
    setFieldValue('pageIndex', 1);
    setFieldValue('pageSize', pageSize);
    handleSubmit();
  };

  const handlePageIndexChange = (
    pageIndex: number,
    setFieldValue: Formik.SetFieldValueFunc,
    handleSubmit: Func,
  ) => {
    setFieldValue('pageIndex', pageIndex);
    handleSubmit();
  };

  const inputStyle = {
    minWidth: '50px',
    width: pageTotal.toString().length * 10,
  };

  const initialValues = {
    pageIndex,
    pageSize,
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting, setFieldValue }) => {
        let isCallPageChange = false;
        const newPageIndex = parseInt(values.pageIndex.toString(), 10);
        const newPageSize = values.pageSize;
        if (pageIndex !== newPageIndex) {
          if (newPageIndex >= 1 && newPageIndex <= pageTotal) {
            isCallPageChange = true;
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
          onPageChange(
            newPageIndex,
            newPageSize,
            () => isMounted.current && setSubmitting(false),
          );
        } else {
          isMounted.current && setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, setFieldValue, isSubmitting, values }) => (
        <Form className="pagination" onSubmit={handleSubmit}>
          <fieldset className="form-inline" disabled={isSubmitting}>
            <Select
              options={pageSizeOptions}
              value={values.pageSize}
              onChange={(selectedOption) => {
                if (selectedOption.value) {
                  handlePageSizeChange(
                    selectedOption.value,
                    setFieldValue,
                    handleSubmit,
                  );
                }
              }}
              inputProps={{
                title: 'Select page size',
                className: 'mr-5',
              }}
            />
            <Button
              type="button"
              disabled={pageIndex === 1}
              color="outline-secondary"
              title="Go to first page"
              onClick={() =>
                handlePageIndexChange(1, setFieldValue, handleSubmit)
              }
            >
              <Icon path={mdiPageFirst} />
            </Button>
            <Button
              type="button"
              disabled={pageIndex === 1}
              color="outline-secondary"
              title="Go to previous page"
              onClick={() =>
                handlePageIndexChange(
                  pageIndex - 1,
                  setFieldValue,
                  handleSubmit,
                )
              }
            >
              <Icon path={mdiPagePreviousOutline} />
            </Button>
            <div className="mx-3">
              Page{' '}
              <Input
                name="pageIndex"
                type="text"
                autoComplete="off"
                style={inputStyle}
                tag={Field}
                title="Go to page"
              />{' '}
              of {pageTotal}
            </div>
            <Button
              type="button"
              disabled={pageIndex >= pageTotal}
              color="outline-secondary"
              title="Go to next page"
              onClick={() =>
                handlePageIndexChange(
                  pageIndex + 1,
                  setFieldValue,
                  handleSubmit,
                )
              }
            >
              <Icon path={mdiPageNextOutline} />
            </Button>
            <Button
              type="button"
              disabled={pageIndex >= pageTotal}
              color="outline-secondary"
              title="Go to last page"
              onClick={() =>
                handlePageIndexChange(pageTotal, setFieldValue, handleSubmit)
              }
            >
              <Icon path={mdiPageLast} />
            </Button>
          </fieldset>
        </Form>
      )}
    </Formik>
  );
};

export default PaginationComponent;
