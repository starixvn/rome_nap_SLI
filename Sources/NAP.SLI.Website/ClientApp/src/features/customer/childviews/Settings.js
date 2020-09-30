import React, { useState } from "react";
import { connect } from "react-redux";
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import classnames from 'classnames';

const Setting = () => {
    const [activeTab, setActiveTab] = useState('1');

    const changeTab = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className="bg-lightgrey text-primary">
            <Nav tabs className="setting-tab">
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1', 'p-3': true })}
                        onClick={() => { changeTab('1'); }}>
                        Setting
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2', 'p-3': true })}
                        onClick={() => { changeTab('2'); }}>
                        Detail
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3', 'p-3': true })}
                        onClick={() => { changeTab('3'); }}>
                        Login
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '4', 'p-3': true })}
                        onClick={() => { changeTab('4'); }}>
                        Online List
                        </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '5', 'p-3': true })}
                        onClick={() => { changeTab('5'); }}>
                        Report
                        </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">

                </TabPane>
                <TabPane tabId="2">

                </TabPane>
                <TabPane tabId="3">

                </TabPane>
                <TabPane tabId="4">

                </TabPane>
                <TabPane tabId="5">

                </TabPane>
            </TabContent>
        </div>
    );
}

const mapStateToProps = state => ({
    balanceInfo: state.balanceInfo
});

export default connect(mapStateToProps)(Setting);