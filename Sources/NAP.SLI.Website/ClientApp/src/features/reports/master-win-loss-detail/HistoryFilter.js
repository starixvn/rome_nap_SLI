import React, { useState } from 'react';
import { Label, Form, Button, FormGroup, Container } from 'reactstrap';
import { DatePicker } from '../../../common/components/date-picker/DatePicker';
import { formatDate } from '../../../common/utils/helper';
import PropTypes from 'prop-types';
import moment from 'moment';

const today = new moment();
const yesterday = new moment(today).subtract(1, 'days');

const propTypes = {
    submit: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};

const HistoryFilter = ({ submit, toggle }) => {
    const [month, setMonth] = useState(today);
    const [fromDate, setFromDate] = useState(0);
    const [toDate, setToDate] = useState(0);

    const handleSubmit = () => {
        submit({
            fromDate,
            toDate
        });
    };

    const setDateAndSubmit = (date) => {
        setFromDate(date);
        setToDate(date);
    }

    return (
        <Container fluid className="filter">
            <Form inline className="mb-3" noValidate>
                <FormGroup className="mr-5">
                    <Label for="month" className="mr-2">View data in month</Label>
                    <DatePicker id="month" value={month} onChange={value => setMonth(value)} />
                </FormGroup>
                <FormGroup className="mr-5">
                    <Label for="fromDate" className="mr-2">From</Label>
                    <DatePicker id="fromDate" value={fromDate} onChange={value => setFromDate(value)} />
                </FormGroup>
                <FormGroup className="mr-5">
                    <Label for="toDate" className="mr-2">To</Label>
                    <DatePicker id="toDate" value={fromDate} onChange={value => setToDate(value)} />
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

export { HistoryFilter };