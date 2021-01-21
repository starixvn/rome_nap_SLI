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
import { Formik, FormikProps, FormikValues } from 'formik';
import FormikDatePicker from '../../../common/components/date-picker/FormikDatePicker';
import {
  formatDate,
  getToday,
  ReportDateRanges,
} from '../../../common/utils/DateUtils';
import { query, toggleMode, excel } from './reducer';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import { useDispatch, useSelector } from 'react-redux';
import { Moment } from 'moment';
import moment from 'moment';

type Props = {
  minDate: Moment;
  maxDate: Moment;
};

const NormalFilter = ({ minDate, maxDate }: Props) => {
  const formikRef = createRef<FormikProps<FormikValues>>();
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownIndex, setDropdownIndex] = useState(0);
  const { customer, pageIndex, pageSize, isHistory } = useSelector(
    (state: AppState) => state.winLossDetail,
  );
  const today = getToday();
  const [fromDate, setFromDate] = useState(today);
  const [toDate, setToDate] = useState(today);
  const [fromMinDate, setFromMinDate] = useState(minDate);
  const [toMaxDate, setToMaxdate] = useState(maxDate);

  if (!customer) {
    return <></>;
  }

  const { custId, roleId } = customer;
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

    setToMaxdate(selectedFromDate);
    setDropdownIndex(ReportDateRanges.length - 1);
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
    setDropdownIndex(ReportDateRanges.length - 1);
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        fromDate: today,
        toDate: today,
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          query(
            {
              isHistory,
              custId,
              roleId,
              pageIndex,
              pageSize,
              fromDate: formatDate(values.fromDate),
              toDate: formatDate(values.toDate),
            },
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
                  name="toDate"
                  minDate={fromMinDate}
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
                  onClick={() => dispatch(excel())}
                >
                  <Icon path={mdiFileExcelOutline} />
                </Button>
              </FormGroup>
            </fieldset>
          </Form>
          <div>
            You can view the report data from 09/01/2019. For more historic
            data, please click to{' '}
            <span className="text-link" onClick={() => dispatch(toggleMode())}>
              View History Report
            </span>
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default NormalFilter;
