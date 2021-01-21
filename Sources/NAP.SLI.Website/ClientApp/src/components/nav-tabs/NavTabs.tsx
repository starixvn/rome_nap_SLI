import './NavTabs.scss';
import React, { useState } from 'react';
import { Nav, NavLink, NavItem, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';

type Props = {
  tabList: Array<TabProps>;
  activeIndex: number;
  className: string;
};

type TabProps = {
  text: string;
  component: React.FC;
};

const NavTabs = (props: Props) => {
  const [activeTab, setActiveTab] = useState(props.activeIndex);

  return (
    <div className={props.className}>
      <Nav tabs className="bg-lightgrey font-weight-500">
        {props.tabList.map((tab, index) => (
          <NavItem key={index}>
            <NavLink
              className={classNames({ active: activeTab === index })}
              onClick={() => setActiveTab(index)}
            >
              {tab.text}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {props.tabList.map((tab, index) => (
          <TabPane key={index} tabId={index}>
            <tab.component />
          </TabPane>
        ))}
      </TabContent>
    </div>
  );
};

export default NavTabs;
