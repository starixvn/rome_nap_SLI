import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { CustomerLevels } from 'utils/CustomerLevelUtils';
import { RouteLinks } from 'utils/RouteUtils';
import ViewSuperPage from './view-super/Page';
import ViewMasterPage from './view-master/Page';
import ViewAgentPage from './view-agent/Page';
import ViewMemberPage from './view-member/Page';

const CustomerSettingPage = () => {
  const history = useHistory();
  const { customer } = useSelector((state: AppState) => state.sidebar);

  if (!customer) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  const renderBody = () => {
    switch (customer.generalInformation.roleId) {
      case CustomerLevels.Super:
        return <ViewSuperPage />;
      case CustomerLevels.Master:
        return <ViewMasterPage />;
      case CustomerLevels.Agent:
        return <ViewAgentPage />;
      case CustomerLevels.Member:
        return <ViewMemberPage />;
    }
  };

  return (
    <div className="customer-setting-page">
      <div className="page-title">Customer Setting</div>
      <div>{renderBody()}</div>
    </div>
  );
};

export default CustomerSettingPage;
