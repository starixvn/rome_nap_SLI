import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Collapse, Button } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './Customer.scss';
import NavTabs from '../../common/components/nav-tabs/NavTabs';
import BalanceInfo from './childviews/BalanceInformation';
import DownlineList from './childviews/DownlineList';
import BasicSetting from './childviews/BasicSetting';
import DetailSetting from './childviews/DetailSetting';
import LoginInformation from './childviews/LoginInformation';
import OnlineList from './childviews/OnlineList';
import Report from './childviews/Report';

const CustomerPage = ({ customer, headline }) => {
    if (!customer) {
        return <></>;
    }

    const [isOpen, setIsOpen] = useState(true);
    const [rotation, setRotation] = useState(0);

    const toggle = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        setRotation(newIsOpen ? 0 : 180);
    };

    const tabList1 = useMemo(
        () => [{
            text: 'Balance Info',
            component: BalanceInfo
        }, {
            text: 'Downline List',
            component: DownlineList
        }],
        []
    );

    const tabList2 = useMemo(
        () => [{
            text: 'Settings',
            component: BasicSetting
        }, {
            text: 'Detail',
            component: DetailSetting
        }, {
            text: 'Login',
            component: LoginInformation
        }, {
            text: 'Online List',
            component: OnlineList
        }, {
            text: 'Report',
            component: Report
        }],
        []
    );

    return (
        <>
            <Container>
                {headline.superID && <Row>
                    <Col xs="5">Super</Col>
                    <Col xs="7">{headline.superName}</Col>
                </Row>}
                {headline.masterID && <Row>
                    <Col xs="5">Master</Col>
                    <Col xs="7">{headline.masterName}</Col>
                </Row>}
                {headline.agentID && <Row>
                    <Col xs="5">Agent</Col>
                    <Col xs="7">{headline.agentName}</Col>
                </Row>}
            </Container>
            <div className="bg-lightgrey text-primary">
                <hr />
                <Container onClick={toggle} className="d-flex">
                    <span className="customer-label">{customer.username}</span>
                    <FontAwesomeIcon className="float-right m-auto" icon={faChevronDown} rotation={rotation}></FontAwesomeIcon>
                </Container>
                <hr />
            </div>
            <Collapse isOpen={isOpen}>
                <Container>
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
            <hr />
            <Container className="d-flex align-items-center justify-content-center">
                {headline.memberID && <Button className="mr-3" color="primary">Bet List</Button>}
                <Button className="ml-3" color="primary">Statement</Button>
            </Container>
            <hr />
            <NavTabs tabList={tabList1} />
            <hr />
            <NavTabs tabList={tabList2} />
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