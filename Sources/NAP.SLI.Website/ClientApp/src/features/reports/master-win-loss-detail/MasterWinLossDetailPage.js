import React, { useState } from 'react';
import { Label, Form, Input, Button, FormGroup, Container } from 'reactstrap';
import { DatePicker } from '../../../common/components/date-picker/DatePicker';
import PropTypes from 'prop-types';

const propTypes = {
    location: PropTypes.object.isRequired
};

const MasterWinLossDetailPage = ({ location }) => {
    const state = location.state || {};
    const [username, setUsername] = useState(state.username);

    const handleSubmit = event => {
        event.preventDefault();
    };

    return (
        <div className="master-win-loss-detail-page">
            <div className="page-title">Master Win Loss Detail</div>
            <Container fluid className="filter">
                <Form inline className="mb-3" onSubmit={handleSubmit} noValidate>
                    <FormGroup className="mr-5">
                        <Label for="username" className="mr-2">Username</Label>
                        <Input id="username" type="text" maxLength="50" value={username} onChange={event => setUsername(event.target.value)} />
                    </FormGroup>
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