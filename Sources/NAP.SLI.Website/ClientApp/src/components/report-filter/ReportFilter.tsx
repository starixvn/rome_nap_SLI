import React, { useState, createRef, useEffect } from 'react';
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
import { ReportDateRanges } from 'utils/DateUtils';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import moment, { Moment } from 'moment';

type Props = {
  minDate: Moment;
  maxDate: Moment;
  fromDate: Moment;
  toDate: Moment;
  onQuery: (fromDate: Moment, toDate: Moment) => void;
  onExcel: () => void;
};

const ReportFilter = ({
  minDate,
  maxDate,
  fromDate,
  toDate,
  onQuery,
  onExcel,
}: Props) => {
  const formikRef = createRef<FormikProps<FormikFilterValues>>();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);

  useEffect(() => {
    if (!formikRef.current) {
      return;
    }

    const { isSubmitting, handleSubmit } = formikRef.current;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [formikRef]);

  const initialValues = {
    fromDate,
    toDate,
  };

  type FormikFilterValues = typeof initialValues;

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
    if (selectedFromDate.isAfter(formikRef.current?.values.toDate)) {
      setFieldValue('toDate', selectedFromDate);
    }

    setDropdownIndex(ReportDateRanges.length - 1);
  };

  const handleToDateChange = (
    selectedDate: string | Moment,
    setFieldValue: Formik.SetFieldValueFunc,
  ) => {
    const selectedToDate = moment(selectedDate);
    if (selectedToDate.isBefore(formikRef.current?.values.fromDate)) {
      setFieldValue('fromDate', selectedToDate);
    }

    setDropdownIndex(ReportDateRanges.length - 1);
  };

  const handleQuery = async (
    { fromDate, toDate }: FormikFilterValues,
    { setSubmitting }: FormikHelpers<FormikFilterValues>,
  ) => {
    // setSubmitting(true);
    await onQuery(fromDate, toDate);
    // setSubmitting(false);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={initialValues}
      onSubmit={handleQuery}
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
        </Container>
      )}
    </Formik>
  );
};

export default ReportFilter;
