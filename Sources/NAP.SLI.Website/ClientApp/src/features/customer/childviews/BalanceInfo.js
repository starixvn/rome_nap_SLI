import React, {useState} from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

const BalanceInfo = () => {
    const [activeTab, setActiveTab] = useState('1');

    const changeTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className="bg-lightgrey text-primary">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { changeTab('1'); }}>
                        Balance Info
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { changeTab('2'); }}>
                        Downline List
                        </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <Container className="bg-light text-dark">
                        <Row>
                            <Col xs="5">Total Cash</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Yesterday Cash</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Total Balance</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Yesterday Balance</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Outstanding</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Given Credit</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Agent Outstanding</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Used Credit</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Agents A/C/S</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
                        </Row>
                        <Row>
                            <Col xs="5">Members A/C/S</Col>
                            <Col xs="7"><span>UUS</span> 0.00</Col>
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