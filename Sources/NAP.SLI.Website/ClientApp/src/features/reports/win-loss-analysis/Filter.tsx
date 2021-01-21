import React, { createRef, useEffect, useState } from 'react';
import {
  Label,
  Form,
  Button,
  FormGroup,
  Container,
  Spinner,
  ButtonGroup,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Formik, FormikProps } from 'formik';
import FormikDatePicker from 'components/date-picker/FormikDatePicker';
import { getToday, formatDate, ReportDateRanges } from 'utils/DateUtils';
import { useDispatch } from 'react-redux';
import { query, WinLossAnalysisState } from './reducer';
import { Moment } from 'moment';
import moment from 'moment';

type Props = {
  custId: number;
  roleId: number;
  username: string;
  reportType: number;
  minDate: Moment;
  maxDate: Moment;
};

const Filter = (props: Props) => {
  const formikRef = createRef<FormikProps<any>>();
  const dispatch = useDispatch();
  const { custId, roleId, minDate, maxDate } = props;
  const [reportType, setReportType] = useState(props.reportType);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const today = getToday();
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [fromMinDate, setFromMinDate] = useState(minDate);
  const [toMaxDate, setToMaxdate] = useState(maxDate);

  useEffect(() => {
    if (!formikRef.current) {
      return;
    }

    const { isSubmitting, handleSubmit } = formikRef.current;
    if (!isSubmitting) {
      handleSubmit();
    }
  }, [custId]);

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
      setToDate(selectedFromDate);
      setFieldValue('toDate', selectedFromDate);
    }

    setFromMinDate(selectedFromDate);
  };

  const handleToDateChange = (
    selectedDate: string | Moment,
    setFieldValue: Formik.SetFieldValueFunc,
  ) => {
    const selectedToDate = moment(selectedDate);
    if (selectedToDate.isBefore(fromDate)) {
      setFromDate(selectedToDate);
      setFieldValue('fromDate', selectedToDate);
    }

    setToMaxdate(selectedToDate);
  };

  return (
    <Formik
      initialValues={{
        fromDate: today,
        toDate: today,
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          query(
            {
              custId,
              roleId,
              reportType,
              ...values,
            } as WinLossAnalysisState,
            () => setSubmitting(false),
          ),
        );
      }}
    >
      {({ handleSubmit, isSubmitting, setFieldValue }) => (
        <Container fluid className="filter">
          <Form inline className="mb-3" onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting} className="form-inline">
              <FormGroup className="mr-5">
                <Label className="mr-2">From</Label>
                <FormikDatePicker
                  value={fromDate}
                  disabled={isSubmitting}
                  name="fromDate"
                  minDate={minDate}
                  maxDate={toMaxDate}
                  onChange={(value) =>
                    handleFromDateChange(value, setFieldValue)
                  }
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">To</Label>
                <FormikDatePicker
                  disabled={isSubmitting}
                  value={toDate}
                  name="toDate"
                  minDate={fromMinDate}
                  maxDate={maxDate}
                  onChange={(value) => handleToDateChange(value, setFieldValue)}
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className="mr-3" />} Submit
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
            </fieldset>
          </Form>
          <>You can view the report data from {formatDate(minDate)}.</>
          <Container fluid={true} className="my-2">
            <span>Report By</span>
            <ButtonGroup className="mx-4">
              <Button
                color="primary"
                onClick={() => setReportType(1)}
                active={reportType == 1}
              >
                Daily
              </Button>
              <Button
                color="primary"
                onClick={() => setReportType(2)}
                active={reportType == 2}
              >
                Monthly
              </Button>
              <Button
                color="primary"
                onClick={() => setReportType(3)}
                active={reportType == 3}
              >
                Sport
              </Button>
            </ButtonGroup>
          </Container>
        </Container>
      )}
    </Formik>
  );
};

export default Filter;
