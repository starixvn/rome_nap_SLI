import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

const BalanceInfo = () => {
    const [activeTab, setActiveTab] = useState('1');

    return (
        <div>
            <Nav tabs className="bg-lightgrey text-primary">
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => setActiveTab('1')}>
                        Balance Info
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => setActiveTab('2')}>
                        Downline List
                        </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Container>
                        <Row>
                            <Col xs="6">Total Cash</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Yesterday Cash</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Total Balance</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Yesterday Balance</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Outstanding</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Given Credit</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Agent Outstanding</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Used Credit</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Agents A/C/S</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="6">Members A/C/S</Col>
                            <Col xs="6" className='text-right'><span className="color-currency">UUS</span> 0.00</Col>
                        </Row>
                    </Container>
                </TabPane>
            </TabContent>
        </div>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(BalanceInfo);