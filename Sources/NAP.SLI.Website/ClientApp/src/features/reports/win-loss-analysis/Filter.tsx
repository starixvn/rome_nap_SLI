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
import { formatDate, getToday, ReportDateRanges } from 'utils/DateUtils';
import { query, excel } from './reducer';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import { useSelector } from 'react-redux';
import { Moment } from 'moment';
import moment from 'moment';
import { useAppDispatch } from 'app/store';

type Props = {
  minDate: Moment;
  maxDate: Moment;
};

const Filter = ({ minDate, maxDate }: Props) => {
  const formikRef = createRef<FormikProps<FormikValues>>();
  const dispatch = useAppDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossAnalysis,
  );
  const today = getToday();
  const initialValues = {
    fromDate: today,
    toDate: today,
  };

  type FormikValues = typeof initialValues;

  if (!queryCustomer) {
    return <></>;
  }

  const { custId, roleId } = queryCustomer;
  const { reportType, fromDate, toDate } = queryArg;
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

  const handleQuery = async (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>,
  ) => {
    setSubmitting(true);
    const queryPayload = {
      reportType,
      custId,
      roleId,
      fromDate: formatDate(values.fromDate),
      toDate: formatDate(values.toDate),
    };
    await dispatch(query(queryPayload));
    setSubmitting(false);
  };

  const handleExcel = async () => {
    const excelPayload = {
      reportType,
      custId,
      roleId,
      fromDate,
      toDate,
    };
    await excel(excelPayload);
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
                  onClick={handleExcel}
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

export default Filter;
