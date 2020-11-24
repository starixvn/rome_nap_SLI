import React, { useState } from 'react';
import { Label, Form, Button, FormGroup, Container } from 'reactstrap';
import { DatePicker } from '../../../common/components/date-picker/DatePicker';
import { formatDate, getToday, getYesterday } from '../../../common/utils/DateUtils';
import PropTypes from 'prop-types';

const today = getToday();
const yesterday = getYesterday();

const propTypes = {
  fromDate: PropTypes.object.isRequired,
  toDate: PropTypes.object.isRequired,
  minDate: PropTypes.object.isRequired,
  maxDate: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired
};

const NormalFilter = (props) => {
  const { minDate, maxDate, submit, toggle } = props;
  const [fromDate, setFromDate] = useState(props.fromDate);
  const [toDate, setToDate] = useState(props.toDate);

  const handleSubmit = () => {
    submit({
      fromDate,
      toDate
    });
  };

  const setDateAndSubmit = (date) => {
    setFromDate(date);
    setToDate(date);
    handleSubmit();
  }

  return (
    <Container fluid className="filter">
      <Form inline className="mb-3" noValidate>
        <FormGroup className="mr-5">
          <Label for="fromDate" className="mr-2">From</Label>
          <DatePicker id="fromDate" value={fromDate} minValue={minDate} maxValue={maxDate} onChange={setFromDate} />
        </FormGroup>
        <FormGroup className="mr-5">
          <Label for="toDate" className="mr-2">To</Label>
          <DatePicker id="toDate" value={toDate} minValue={minDate} maxValue={maxDate} onChange={setToDate} />
        </FormGroup>
        <FormGroup className="mr-2">
          <Button onClick={handleSubmit} type="button" color="primary" className="btn-block">Submit</Button>
        </FormGroup>
        <FormGroup className="mr-2">
          <Button onClick={() => setDateAndSubmit(today)} type="button" color="primary" className="btn-block">{formatDate(today)}</Button>
        </FormGroup>
        <FormGroup>
          <Button onClick={() => setDateAndSubmit(yesterday)} type="button" color="primary" className="btn-block">{formatDate(yesterday)}</Button>
        </FormGroup>
      </Form>
      <div>
        You can view the report data from 09/01/2019. For more historic data, please click to <span className="text-link" onClick={toggle}>View History Report</span>
      </div>
    </Container>
  );
}

NormalFilter.propTypes = propTypes;

export default NormalFilter;