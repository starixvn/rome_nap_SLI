import React from 'react';
import PropTypes from 'prop-types';
import { SuperSettingPage } from './super-setting/SuperSettingPage';
import { MasterSettingPage } from './master-setting/MasterSettingPage';
import { AgentSettingPage } from './agent-setting/AgentSettingPage';
import { MemberSettingPage } from './member-setting/MemberSettingPage';
import { CustomerRole } from '../../common/models/CustomerRole';

const CustomerSettingPage = ({ location }) => {
    const { custid, roleid } = location.state;

    const renderSetting = () => {
        switch (roleid) {
            case CustomerRole.Super:
                return <SuperSettingPage custid={custid} />;
            case CustomerRole.Master:
                return <MasterSettingPage custid={custid} />;
            case CustomerRole.Agent:
                return <AgentSettingPage custid={custid} />;
            case CustomerRole.Member:
                return <MemberSettingPage custid={custid} />;
        }
    }

    return (
        <div className="customer-setting-page">
            <div className="page-title">Customer Setting</div>
            {renderSetting(roleid)}
        </div>
    );
}

CustomerSettingPage.propTypes = {
    location: PropTypes.object.isRequired
};

export { CustomerSettingPage };