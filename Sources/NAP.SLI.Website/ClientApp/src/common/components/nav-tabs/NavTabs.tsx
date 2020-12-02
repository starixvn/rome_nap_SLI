// @ts-nocheck
import React, { useState } from "react";
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './NavTabs.scss';

const propTypes = {
    tabList: PropTypes.array.isRequired,
    activeIndex: PropTypes.number,
    className: PropTypes.string
};

const defaultProps = {
    activeIndex: 0
};

const NavTabs = ({ tabList, activeIndex, className }) => {
    const [activeTab, setActiveTab] = useState(activeIndex);

    return (
        <div className={className}>
            <Nav tabs className="bg-lightgrey font-weight-500">
                {tabList.map((tab, index) =>
                    <NavItem key={index}>
                        <NavLink className={classNames({ active: activeTab === index })} onClick={() => setActiveTab(index)}>
                            {tab.text}
                        </NavLink>
                    </NavItem>
                )}
            </Nav>
            <TabContent activeTab={activeTab}>
                {tabList.map((tab, index) =>
                    <TabPane key={index} tabId={index}>
                        <tab.component />
                    </TabPane>
                )}
            </TabContent>
        </div>
    );
}

NavTabs.propTypes = propTypes;
NavTabs.defaultProps = defaultProps;

export default NavTabs;