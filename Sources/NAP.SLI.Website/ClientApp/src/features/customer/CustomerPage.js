import './CustomerPage.scss';
import React, { useState } from 'react';
import { Container, Row, Col, Collapse, Nav, NavLink, NavItem } from 'reactstrap';
import { NavLink as RRNavLink, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { RouteLinks } from '../../common/models/Constants';
import { CustomerLevels } from '../../common/models/CustomerLevel';

const CustomerPage = ({ searchCustomer }) => {
    if (!searchCustomer) {
        return <></>;
    }

    const { generalInformation, headline } = searchCustomer;
    const { custId, roleId, username, firstName, lastName, username2, fax, phone, mobilePhone } = generalInformation;
    const { superId, superName, masterId, masterName, agentId, agentName } = headline;
    const [isOpenCustomerInfo, setIsOpenCustomerInfo] = useState(true);
    const [isOpenReports, setIsOpenReports] = useState(true);

    return (
        <div className="customer-page">
            <Container className="my-3">
                {superId > 0 && <Row>
                    <Col xs="5">Super</Col>
                    <Col xs="7"><span className="text-link">{superName}</span></Col>
                </Row>}
                {masterId > 0 && <Row>
                    <Col xs="5">Master</Col>
                    <Col xs="7"><span className="text-link">{masterName}</span></Col>
                </Row>}
                {agentId > 0 && <Row>
                    <Col xs="5">Agent</Col>
                    <Col xs="7"><span className="text-link">{agentName}</span></Col>
                </Row>}
            </Container>
            <div className="mb-3">
                <div className="py-2 font-weight-500 bg-lightgrey text-primary">
                    <Container onClick={() => setIsOpenCustomerInfo(!isOpenCustomerInfo)} className="d-flex">
                        <span className="width-inherit">{username}</span>
                        <FontAwesomeIcon className="float-right m-auto" icon={faChevronDown} rotation={isOpenCustomerInfo ? 0 : 180}></FontAwesomeIcon>
                    </Container>
                </div>
                <Collapse isOpen={isOpenCustomerInfo}>
                    <Container className="pb-2">
                        <Row>
                            <Col xs="5">Name</Col>
                            <Col xs="7">{firstName} - {lastName}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Nick Name</Col>
                            <Col xs="7">{username2}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Fax</Col>
                            <Col xs="7">{fax}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Phone</Col>
                            <Col xs="7">{phone}</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Mobile</Col>
                            <Col xs="7">{mobilePhone}</Col>
                        </Row>
                    </Container>
                </Collapse>
            </div>
            <div className="mb-3">
                <div className="py-2 font-weight-500 bg-lightgrey text-primary">
                    <Container>
                        <Link to={{
                            pathname: RouteLinks.CUSTOMER_SETTING,
                            state: {
                                custId,
                                roleId
                            }
                        }}>
                            VIEW SETTING
                        </Link>
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
                    <Container className="pb-2">
                        <Nav vertical>
                            {roleId !== CustomerLevels.Member && <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={{
                                        pathname: RouteLinks.MASTER_WIN_LOSS_DETAIL,
                                        state: {
                                            custId,
                                        }
                                    }}>
                                        Master Win Loss Detail
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={{
                                        pathname: RouteLinks.MATCH_WIN_LOSS_DETAIL,
                                        state: {
                                            custId,
                                        }
                                    }}>
                                        Match Win Loss Detail
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={{
                                        pathname: RouteLinks.WIN_LOSS_BY_BETTYPE,
                                        state: {
                                            custId,
                                        }
                                    }}>
                                        Win Loss By Bet Type
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={{
                                        pathname: RouteLinks.WIN_LOSS_ANALYSIS,
                                        state: {
                                            custId,
                                        }
                                    }}>
                                        Win Loss Analysis
                                    </NavLink>
                                </NavItem>
                            </>}
                            {roleId === CustomerLevels.Member && <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to={RouteLinks.BET_LIST}>Bet List</NavLink>
                                </NavItem>
                            </>}
                        </Nav>
                    </Container>
                </Collapse>
            </div>
        </div>
    );
};

CustomerPage.propTypes = {
    searchCustomer: PropTypes.object
};

const connectedCustomerPage = connect(
    state => state.searchCustomer
)(CustomerPage);

export { connectedCustomerPage as CustomerPage };