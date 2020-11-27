import React from 'react';
import PropTypes from 'prop-types';
import SuperSettingPage from './super-setting/Page';
import MasterSettingPage from './master-setting/Page';
import AgentSettingPage from './agent-setting/Page';
import MemberSettingPage from './member-setting/Page';
import { CustomerLevels } from '../../common/models/CustomerLevel';

const propTypes = {
  location: PropTypes.object.isRequired
};

const CustomerSettingPage = ({ location }) => {
  const { custid, roleid } = location.state;

  const renderSetting = () => {
    switch (roleid) {
      case CustomerLevels.Super:
        return <SuperSettingPage custid={custid} />;
      case CustomerLevels.Master:
        return <MasterSettingPage custid={custid} />;
      case CustomerLevels.Agent:
        return <AgentSettingPage custid={custid} />;
      case CustomerLevels.Member:
        return <MemberSettingPage custid={custid} />;
      default:
        return <></>;
    }
  }

  return (
    <div className="customer-setting-page">
      <div className="page-title">Customer Setting</div>
      {renderSetting(roleid)}
    </div>
  );
}

CustomerSettingPage.propTypes = propTypes;
export default CustomerSettingPage;