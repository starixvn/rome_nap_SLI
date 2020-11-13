import './CustomerPage.scss';
import React, { useState } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const CustomerPage = ({ customer, headline }) => {
    if (!customer) {
        return <></>;
    }

    const [isOpenCustomerInfo, setIsOpenCustomerInfo] = useState(true);
    const [isOpenReports, setIsOpenReports] = useState(true);

    return (
        <div className="customer-page">
            <Container className="my-3">
                {headline.superID && <Row>
                    <Col xs="5">Super</Col>
                    <Col xs="7"><span className="text-link">{headline.superName}</span></Col>
                </Row>}
                {headline.masterID && <Row>
                    <Col xs="5">Master</Col>
                    <Col xs="7"><span className="text-link">{headline.masterName}</span></Col>
                </Row>}
                {headline.agentID && <Row>
                    <Col xs="5">Agent</Col>
                    <Col xs="7"><span className="text-link">{headline.agentName}</span></Col>
                </Row>}
            </Container>
            <div className="mb-3">
                <div className="py-2 font-weight-500 bg-lightgrey text-primary">
                    <Container onClick={() => setIsOpenCustomerInfo(!isOpenCustomerInfo)} className="d-flex">
                        <span className="width-inherit">{customer.username}</span>
                        <FontAwesomeIcon className="float-right m-auto" icon={faChevronDown} rotation={isOpenCustomerInfo ? 0 : 180}></FontAwesomeIcon>
                    </Container>
                </div>
                <Collapse isOpen={isOpenCustomerInfo}>
                    <Container className="pb-2 border-bottom">
                        <Row>
                            <Col xs="5">Name</Col>
                            <Col xs="7">{customer.firstname} - {customer.lastname}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Nick Name</Col>
                            <Col xs="7">{customer.username2}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Fax</Col>
                            <Col xs="7">{customer.fax}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Phone</Col>
                            <Col xs="7">{customer.phone}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Mobile</Col>
                            <Col xs="7">{customer.mobilephone}</Col>
                        </Row>
                    </Container>
                </Collapse>
            </div>
            <div className="mb-3">
                <div className="py-2 font-weight-500 bg-lightgrey text-primary">
                    <Container>
                        <div className="text-link">VIEW SETTING</div>
                    </Container>
                </div>
            </div>
            <div className="mb-3">
                <div className="py-2 font-weight-500 bg-lightgrey text-primary">
                    <Container onClick={() => setIsOpenReports(!isOpenReports)} className="d-flex">
                        <span className="width-inherit">REPORTS</span>
                        <FontAwesomeIcon className="float-right m-auto" icon={faChevronDown} rotation={isOpenReports ? 0 : 180}></FontAwesomeIcon>
                    </Container>
                </div>
                <Collapse isOpen={isOpenReports}>
                    <Container className="pb-2 border-bottom">
                        <div className="text-link">Master Win Loss Detail</div>
                        <div className="text-link">Match Win Loss Detail</div>
                        <div className="text-link">Win Loss By Bet Type</div>
                        <div className="text-link">Win Loss Analysis</div>
                        <div className="text-link">BetList</div>
                    </Container>
                </Collapse>
            </div>
        </div>
    );
};

CustomerPage.propTypes = {
    customer: PropTypes.object,
    headline: PropTypes.object
};

const connectedCustomerPage = connect(
    state => state.customer
)(CustomerPage);

export { connectedCustomerPage as CustomerPage };