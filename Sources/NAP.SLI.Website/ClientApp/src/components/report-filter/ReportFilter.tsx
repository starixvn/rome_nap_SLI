import React, { useState, createRef, useEffect, ReactNode } from 'react';
import {
  Label,
  Form,
  Button,
  FormGroup,
  Container,
  Spinner,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import FormikDatePicker from 'components/date-picker/FormikDatePicker';
import { getToday, ReportDateRanges } from 'utils/DateUtils';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import moment, { Moment } from 'moment';

/* eslint-disable @typescript-eslint/no-explicit-any*/
type Props = {
  minDate: Moment;
  maxDate: Moment;
  queryCustomer: any;
  queryArg: any;
  component?: ReactNode;
  onQuery: (
    values: FormikFilterValues,
    helpers: FormikHelpers<FormikFilterValues>,
  ) => Promise<void>;
  onExcel: () => Promise<void>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export type FormikFilterValues = {
  fromDate: Moment;
  toDate: Moment;
};

const ReportFilter = ({
  minDate,
  maxDate,
  queryCustomer,
  queryArg,
  component,
  onQuery,
  onExcel,
}: Props) => {
  const formikRef = createRef<FormikProps<FormikFilterValues>>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);

  const { fromDate, toDate } = queryArg;

  useEffect(() => {
    if (!formikRef.current) {
      return;
    }

    const { isSubmitting, handleSubmit } = formikRef.current;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [formikRef, queryCustomer]);

  if (!queryCustomer) {
    return <></>;
  }

  const today = getToday();
  const initialValues = {
    fromDate: today,
    toDate: today,
  };

  const handleDropdownItemClick = (
    index: number,
    setFieldValue: Formik.SetFieldValueFunc,
    handleSubmit: Func,
  ) => {
    setDropdownIndex(index);
    const range = ReportDateRanges[index].getRange();
    if (range) {
      const { from, to } = range;
      setFieldValue('fromDate', from);
      setFieldValue('toDate', to);
      handleSubmit();
    }
  };

  const handleFromDateChange = (
    selectedDate: string | Moment,
    setFieldValue: Formik.SetFieldValueFunc,
  ) => {
    const selectedFromDate = moment(selectedDate);
    if (selectedFromDate.isAfter(toDate)) {
      setFieldValue('toDate', selectedFromDate);
    }

    setDropdownIndex(ReportDateRanges.length - 1);
  };

  const handleToDateChange = (
    selectedDate: string | Moment,
    setFieldValue: Formik.SetFieldValueFunc,
  ) => {
    const selectedToDate = moment(selectedDate);
    if (selectedToDate.isBefore(fromDate)) {
      setFieldValue('fromDate', selectedToDate);
    }

    setDropdownIndex(ReportDateRanges.length - 1);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={onQuery}
    >
      {({ handleSubmit, isSubmitting, setFieldValue }) => (
        <Container fluid className="filter">
          <Form inline className="mb-3" onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting} className="form-inline">
              <FormGroup className="mr-5">
                <Label className="mr-2">From</Label>
                <FormikDatePicker
                  disabled={isSubmitting}
                  name="fromDate"
                  minDate={minDate}
                  onChange={(value) =>
                    handleFromDateChange(value, setFieldValue)
                  }
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">To</Label>
                <FormikDatePicker
                  disabled={isSubmitting}
                  name="toDate"
                  maxDate={maxDate}
                  onChange={(value) => handleToDateChange(value, setFieldValue)}
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className="mr-3" />}
                  Submit
                </Button>
              </FormGroup>
              <FormGroup className="mr-5">
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={() => setDropdownOpen(!dropdownOpen)}
                >
                  <DropdownToggle color="primary" caret>
                    {ReportDateRanges[dropdownIndex].label}
                  </DropdownToggle>
                  <DropdownMenu>
                    {ReportDateRanges.map((option, index) => (
                      <DropdownItem
                        key={index}
                        onClick={() =>
                          handleDropdownItemClick(
                            index,
                            setFieldValue,
                            handleSubmit,
                          )
                        }
                      >
                        {option.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
              <FormGroup>
                <Button
                  type="button"
                  color="success"
                  className="btn-excel"
                  title="Export to Excel"
                  onClick={onExcel}
                >
                  <Icon path={mdiFileExcelOutline} />
                </Button>
              </FormGroup>
            </fieldset>
          </Form>
          {component}
        </Container>
      )}
    </Formik>
  );
};

export default ReportFilter;
