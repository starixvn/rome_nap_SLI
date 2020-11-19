import React from 'react';
import { Label, Form, Button, FormGroup, Container } from 'reactstrap';
import { DatePicker } from '../../../common/components/date-picker/DatePicker';
import PropTypes from 'prop-types';

const propTypes = {
    location: PropTypes.object.isRequired
};

const MasterWinLossDetailPage = ({ location }) => {
    const state = location.state || {};
    const { custId } = state;

    const handleSubmit = event => {
        event.preventDefault();
    };

    return (
        <div className="master-win-loss-detail-page">
            <div className="page-title">Master Win Loss Detail {custId}</div>
            <Container fluid className="filter">
                <Form inline className="mb-3" onSubmit={handleSubmit} noValidate>
                    <FormGroup className="mr-5">
                        <Label for="fromDate" className="mr-2">From</Label>
                        <DatePicker id="fromDate" />
                    </FormGroup>
                    <FormGroup className="mr-5">
                        <Label for="toDate" className="mr-2">To</Label>
                        <DatePicker id="toDate" />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit" color="primary" className="btn-block">Submit</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    );
}

MasterWinLossDetailPage.propTypes = propTypes;

export { MasterWinLossDetailPage };