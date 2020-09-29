import React, { useState } from 'react';
import { Container, Row, Col, Collapse } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './Customer.scss';

const CustomerPage = ({ customer, headline }) => {
    if (!customer) {
        return (<div></div>);
    }
    const [isOpen, setIsOpen] = useState(true);
    const [rotation, setRotation] = useState(0);

    const toggle = () => {
        setIsOpen(!isOpen);
        setRotation(isOpen ? 270 : 0);
    };

    let customerSuper = "";
    let customerMaster = "";
    let customerAgent = "";
    let customerMember = "";


    if (headline.superID) {
        customerSuper = <Row >
            <Col xs="5">Super:</Col>
            <Col xs="7">{headline.superName}</Col>
        </Row>;
    }

    if (headline.masterID) {
        customerMaster = <Row >
            <Col xs="5">Master:</Col>
            <Col xs="7">{headline.masterName}</Col>
        </Row>;
    }

    if (headline.agentID) {
        customerAgent = <Row >
            <Col xs="5">Agent:</Col>
            <Col xs="7">{headline.agentName}</Col>
        </Row>;
    }

    if (headline.memberID) {
        customerMember = <Row >
            <Col xs="5">Member:</Col>
            <Col xs="7">{headline.memberName}</Col>
        </Row>;
    }

    return (
        <>
            <Container>
                {customerSuper}
                {customerMaster}
                {customerAgent}
                {customerMember}
            </Container>
            <Container onClick={toggle} className="d-flex bg-info"><span className="customer-label">{customer.username}</span><FontAwesomeIcon className="float-right m-auto" icon={faChevronDown} rotation={rotation}></FontAwesomeIcon></Container>
            <Collapse isOpen={isOpen}>
                <Container>
                    <Row>
                        <Col xs="5">Name:</Col>
                        <Col xs="7">{customer.firstname} - {customer.lastname}</Col>
                    </Row>
                    <Row>
                        <Col xs="5">Nick Name:</Col>
                        <Col xs="7">{customer.username2}</Col>
                    </Row>
                    <Row>
                        <Col xs="5">Fax:</Col>
                        <Col xs="7">{customer.fax}</Col>
                    </Row>
                    <Row>
                        <Col xs="5">Phone:</Col>
                        <Col xs="7">{customer.phone}</Col>
                    </Row>
                    <Row>
                        <Col xs="5">Mobile:</Col>
                        <Col xs="7">{customer.mobilephone}</Col>
                    </Row>
                </Container>
            </Collapse>
        </>

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