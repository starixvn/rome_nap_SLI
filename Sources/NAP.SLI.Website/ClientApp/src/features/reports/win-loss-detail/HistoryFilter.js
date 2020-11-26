import React from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import FormikMonthPicker from '../../../common/components/month-picker/FormikMonthPicker';
import { formatDate, getToday, getYesterday } from '../../../common/utils/DateUtils';
import PropTypes from 'prop-types';
import { generateRangeSelectOptions } from '../../../common/utils/SelectUtils';
import FormikSelect from '../../../common/components/select/FormikSelect';
import { useDispatch } from 'react-redux';
import { query, toggleMode } from './reducer';
import * as moment from 'moment';

const today = getToday();
const yesterday = getYesterday();
const generateDateOptions = (date) => {
  return generateRangeSelectOptions(1, date.daysInMonth());
}

const propTypes = {
  custId: PropTypes.number.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired
};

const HistoryFilter = (props) => {
  const dispatch = useDispatch();
  const { custId, minDate, maxDate } = props;

  const month = getToday();
  const dateOptions = generateDateOptions(month);
  const fromDateOption = dateOptions[0].value;
  const toDateOption = dateOptions[0].value;

  const handleMonthChange = (value, setFieldValue) => {
    setFieldValue('dateOptions', generateDateOptions(value));
  }

  const setDateAndSubmit = (date, setFieldValue, handleSubmit) => {
    setFieldValue('month', date);
    handleMonthChange(date, setFieldValue);
    handleSubmit();
  }

  return (
    <Formik
      initialValues={{
        custId,
        month,
        dateOptions,
        fromDateOption,
        toDateOption
      }}
      onSubmit={(values, { setSubmitting }) => {
        const month = values.month;
        const fromDate = moment(month).date(values.fromDateOption);
        const toDate = moment(month).date(values.toDateOption);
        dispatch(query({
          custId: values.custId,
          fromDate,
          toDate
        }, () => setSubmitting(false)));
      }}
    >
      {({
        values,
        setFieldValue,
        handleSubmit,
        isSubmitting
      }) => (
          <Container fluid className="filter">
            <Form inline className="mb-3" onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting} className="form-inline">
                <FormGroup className="mr-5">
                  <Label className="mr-2">View data in month</Label>
                  <FormikMonthPicker name="month" minValue={minDate} maxValue={maxDate} onChange={(value) => handleMonthChange(value, setFieldValue)} />
                </FormGroup>
                <FormGroup className="mr-5">
                  <Label className="mr-2">From</Label>
                  <FormikSelect name="fromDateOption" options={values['dateOptions']} />
                </FormGroup>
                <FormGroup className="mr-5">
                  <Label className="mr-2">To</Label>
                  <FormikSelect name="toDateOption" options={values['dateOptions']} />
                </FormGroup>
                <FormGroup className="mr-2">
                  <Button type="submit" color="primary">
                    {isSubmitting && <Spinner className='mr-3' />}
                    Submit
                  </Button>
                </FormGroup>
                <FormGroup className="mr-2">
                  <Button onClick={() => setDateAndSubmit(today, setFieldValue, handleSubmit)} type="button" color="primary">
                    {formatDate(today)}
                  </Button>
                </FormGroup>
                <FormGroup>
                  <Button onClick={() => setDateAndSubmit(yesterday, setFieldValue, handleSubmit)} type="button" color="primary">
                    {formatDate(yesterday)}
                  </Button>
                </FormGroup>
              </fieldset>
            </Form>
            <div>
              You can view the report data from 09/01/2019. <span className="text-link" onClick={() => dispatch(toggleMode())}>Back To Current Report</span>
            </div>
          </Container>
        )}
    </Formik>
  );
}

HistoryFilter.propTypes = propTypes;
export default HistoryFilter;