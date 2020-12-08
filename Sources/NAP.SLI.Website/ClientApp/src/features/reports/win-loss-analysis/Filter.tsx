// @ts-nocheck
import React, { useState } from 'react';
import { Label, Form, Button, FormGroup, Container, Spinner, Input, Row, Col, ButtonGroup } from 'reactstrap';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import FormikDatePicker from '../../../common/components/date-picker/FormikDatePicker';
import { getToday, getYesterday, formatDate } from '../../../common/utils/DateUtils';
import { useDispatch } from 'react-redux';
import { query } from './reducer';

const propTypes = {
    custId: PropTypes.number.isRequired,
    roleId: PropTypes.number.isRequired,
    reportType: PropTypes.number.isRequired,
    minDate: PropTypes.object.isRequired,
    maxDate: PropTypes.object.isRequired
};

const Filter = (props) => {
    const dispatch = useDispatch();
    const { custId, username, roleId, minDate, maxDate } = props;
    const [reportType, setReportType] = useState(props.reportType);
    const today = formatDate(getToday());
    const yesterday = formatDate(getYesterday());

    return (
        <Formik
            initialValues={{
                fromDate: getToday(),
                toDate: getToday()
            }}
            onSubmit={(values, { setSubmitting }) => {
                dispatch(query({
                    custId,
                    roleId,
                    reportType,
                    ...values
                }, () => setSubmitting(false)));
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
                                    <Label className="mr-2">Username</Label>
                                    <Input name="username" value={username} disabled={true} />
                                </FormGroup>
                                <FormGroup className="mr-5">
                                    <Label className="mr-2">From</Label>
                                    <FormikDatePicker disabled={isSubmitting} name="fromDate" minValue={minDate} maxValue={maxDate} />
                                </FormGroup>
                                <FormGroup className="mr-5">
                                    <Label className="mr-2">To</Label>
                                    <FormikDatePicker disabled={isSubmitting} name="toDate" minValue={minDate} maxValue={maxDate} />
                                </FormGroup>
                                <FormGroup className="mr-5">
                                    <Button type="submit" color="primary">
                                        {isSubmitting && <Spinner className='mr-3' />} Submit
                                    </Button>
                                </FormGroup>
                                <FormGroup className="mr-5">
                                    <Button color="primary">
                                        {today}
                                    </Button>
                                </FormGroup>
                                <FormGroup className="mr-5">
                                    <Button color="primary">
                                        {yesterday}
                                    </Button>
                                </FormGroup>
                            </fieldset>
                        </Form>
                        <>
                            You can view the report data from {formatDate(minDate)}.
                        </>
                        <Container fluid={true}>
                            <Row>
                                <Col xs="1">Report By</Col>
                                <Col xs="2">
                                    <ButtonGroup>
                                        <Button color="primary" onClick={() => setReportType(1)} active={reportType == 1}>Daily</Button>
                                        <Button color="primary" onClick={() => setReportType(2)} active={reportType == 2}>Monthly</Button>
                                        <Button color="primary" onClick={() => setReportType(3)} active={reportType == 3}>Sport</Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                        </Container>
                    </Container>
                )}
        </Formik>
    );
}

Filter.propTypes = propTypes;
export default Filter;