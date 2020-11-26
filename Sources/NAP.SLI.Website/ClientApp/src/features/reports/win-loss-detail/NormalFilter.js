import React from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import FormikDatePicker from '../../../common/components/date-picker/FormikDatePicker';
import { formatDate, getToday, getYesterday } from '../../../common/utils/DateUtils';
import { query, toggleMode } from './reducer';
import { useDispatch } from 'react-redux';

const today = getToday();
const yesterday = getYesterday();

const propTypes = {
  custId: PropTypes.number.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired
};

const NormalFilter = (props) => {
  const dispatch = useDispatch();
  const { custId, minDate, maxDate } = props;

  const setDateAndSubmit = (date, setFieldValue, handleSubmit) => {
    setFieldValue('fromDate', date);
    setFieldValue('toDate', date);
    handleSubmit();
  }

  return (
    <Formik
      initialValues={{
        custId,
        fromDate: getToday(),
        toDate: getToday()
      }}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(query(values, () => setSubmitting(false)));
      }}
    >
      {({
        handleSubmit,
        isSubmitting,
        setFieldValue
      }) => (
          <Container fluid className="filter">
            <Form inline className="mb-3" onSubmit={handleSubmit}>
              <fieldset disabled={isSubmitting} className="form-inline">
                <FormGroup className="mr-5">
                  <Label className="mr-2">From</Label>
                  <FormikDatePicker name="fromDate" minValue={minDate} maxValue={maxDate} />
                </FormGroup>
                <FormGroup className="mr-5">
                  <Label className="mr-2">To</Label>
                  <FormikDatePicker name="toDate" minValue={minDate} maxValue={maxDate} />
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
              You can view the report data from 09/01/2019. For more historic data, please click to <span className="text-link" onClick={() => dispatch(toggleMode())}>View History Report</span>
            </div>
          </Container>
        )}
    </Formik>
  );
}

NormalFilter.propTypes = propTypes;
export default NormalFilter;