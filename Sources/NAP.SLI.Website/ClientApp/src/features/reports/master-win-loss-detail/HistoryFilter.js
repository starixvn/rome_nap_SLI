import React, { useState } from 'react';
import { Label, Form, Button, FormGroup, Container } from 'reactstrap';
import { MonthPicker } from '../../../common/components/month-picker/MonthPicker';
import { formatDate, getToday, getYesterday } from '../../../common/utils/DateUtils';
import PropTypes from 'prop-types';
import { generateRangeSelectOptions } from '../../../common/utils/helper';
import Select from '../../../common/components/select/Select';

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

const HistoryFilter = (props) => {
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

  const handleMonthChange = (value) => {
    setFromDate(fromDate.set('month', value.month()));
    setToDate(toDate.set('month', value.month()));
  };

  const fromOptions = generateRangeSelectOptions(1, 31);
  const toOptions = generateRangeSelectOptions(1, 31);

  const handleFromDateChange = (option) => {
    setFromDate(fromDate.set('date', option.value));
  };

  const handleToDateChange = (option) => {
    setToDate(toDate.set('date', option.value));
  };

  const fromOption = fromOptions.filter(option => option.value === fromDate.date())[0];
  const toOption = toOptions.filter(option => option.value === toDate.date())[0];

  return (
    <Container fluid className="filter">
      <Form inline className="mb-3" noValidate>
        <FormGroup className="mr-5">
          <Label for="month" className="mr-2">View data in month</Label>
          <MonthPicker id="month" value={props.fromDate} minValue={minDate} maxValue={maxDate} onChange={handleMonthChange} />
        </FormGroup>
        <FormGroup className="mr-5">
          <Label for="fromDate" className="mr-2">From</Label>
          <Select id="fromDate" options={fromOptions} value={fromOption} onChange={handleFromDateChange} />
        </FormGroup>
        <FormGroup className="mr-5">
          <Label for="toDate" className="mr-2">To</Label>
          <Select id="toDate" options={toOptions} value={toOption} onChange={handleToDateChange} />
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
        You can view the report data from 09/01/2019. <span className="text-link" onClick={toggle}>Back To Current Report</span>
      </div>
    </Container>
  );
}

HistoryFilter.propTypes = propTypes;

export default HistoryFilter;