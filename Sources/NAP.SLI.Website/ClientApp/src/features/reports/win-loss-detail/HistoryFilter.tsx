import React, { createRef, useEffect } from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner } from 'reactstrap';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import FormikMonthPicker from 'components/month-picker/FormikMonthPicker';
import { formatDate, getToday } from 'utils/DateUtils';
import { generateRangeSelectOptions } from 'utils/SelectUtils';
import FormikSelect from 'components/select/FormikSelect';
import { useSelector } from 'react-redux';
import Icon from '@mdi/react';
import { mdiFileExcelOutline } from '@mdi/js';
import { query, toggleMode, excel } from './reducer';
import moment, { Moment } from 'moment';
import { useAppDispatch } from 'app/store';

const generateDateOptions = (date: Moment, maxDate: Moment) => {
  let daysInMonth = date.daysInMonth();
  if (date.month() === maxDate.month() && date.year() === maxDate.year()) {
    daysInMonth = maxDate.date();
  }

  return generateRangeSelectOptions(1, daysInMonth);
};

type Props = {
  maxDate: Moment;
};

const HistoryFilter = ({ maxDate }: Props) => {
  const formikRef = createRef<FormikProps<FormikValues>>();
  const dispatch = useAppDispatch();
  const { queryCustomer, queryArg } = useSelector(
    (state: AppState) => state.winLossDetail,
  );

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

  const { custId, roleId, username } = queryCustomer;
  const { isHistory, fromDate, toDate, pageIndex, pageSize } = queryArg;

  const month = getToday();
  const dateOptions = generateDateOptions(month, maxDate);
  const fromDateOption = dateOptions[0].value;
  const toDateOption = dateOptions[month.date() - 1].value;

  const initialValues = {
    month,
    dateOptions,
    fromDateOption,
    toDateOption,
  };

  type FormikValues = typeof initialValues;

  const handleMonthChange = (
    value: Moment,
    setFieldValue: Formik.SetFieldValueFunc,
  ) => {
    const dateOptions = generateDateOptions(value, maxDate);
    setFieldValue('dateOptions', dateOptions);
    setFieldValue('fromDateOption', dateOptions[0].value);
    if (value.isSame(getToday())) {
      setFieldValue('toDateOption', dateOptions[value.date() - 1].value);
    } else {
      setFieldValue('toDateOption', dateOptions[dateOptions.length - 1].value);
    }
  };

  const handleQuery = async (
    values: FormikValues,
    { setSubmitting }: FormikHelpers<FormikValues>,
  ) => {
    setSubmitting(true);
    const month = values.month;
    const fromDate = moment(month).date(values.fromDateOption);
    const toDate = moment(month).date(values.toDateOption);
    const queryPayload = {
      isHistory,
      custId,
      roleId,
      fromDate: formatDate(fromDate),
      toDate: formatDate(toDate),
      pageIndex,
      pageSize,
    };
    await dispatch(query(queryPayload));
    setSubmitting(false);
  };

  const handleExcel = async () => {
    const excelPayload = {
      isHistory,
      custId,
      roleId,
      username,
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
      {({ values, setFieldValue, handleSubmit, isSubmitting }) => (
        <Container fluid className="filter">
          <Form inline className="mb-3" onSubmit={handleSubmit}>
            <fieldset disabled={isSubmitting} className="form-inline">
              <FormGroup className="mr-5">
                <Label className="mr-2">View data in month</Label>
                <FormikMonthPicker
                  disabled={isSubmitting}
                  name="month"
                  maxDate={maxDate}
                  onChange={(value) =>
                    handleMonthChange(moment(value), setFieldValue)
                  }
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">From</Label>
                <FormikSelect
                  name="fromDateOption"
                  options={values.dateOptions}
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Label className="mr-2">To</Label>
                <FormikSelect
                  name="toDateOption"
                  options={values.dateOptions}
                />
              </FormGroup>
              <FormGroup className="mr-5">
                <Button type="submit" color="primary">
                  {isSubmitting && <Spinner className="mr-3" />}
                  Submit
                </Button>
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
          <div>
            You can view the report data from 09/01/2019.{' '}
            <span className="text-link" onClick={() => dispatch(toggleMode())}>
              Back To Current Report
            </span>
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default HistoryFilter;
