import React from 'react';
import PropTypes from 'prop-types';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import { useSelector } from 'react-redux';
import { getWinLossDetailTitle, CustomerLevels } from '../../../common/models/CustomerLevel';
import MasterList from './MasterList';
import AgentList from './AgentList';
import MemberList from './MemberList';

const propTypes = {
  location: PropTypes.object.isRequired
};

const Modes = {
  Normal: 1,
  History: 2
}

const MasterWinLossDetailPage = ({ location }) => {
  const state = location.state || {};
  const { roleId } = state;
  const { mode, data } = useSelector(state => state.winLossDetail);

  const renderList = () => {
    if (!data) {
      return <></>;
    }

    switch (roleId) {
      case CustomerLevels.Super:
        return <MasterList />;
      case CustomerLevels.Master:
        return <AgentList />;
      case CustomerLevels.Agent:
        return <MemberList />;
    }
  }

  return (
    <div className="win-loss-detail-page">
      <div className="page-title">{getWinLossDetailTitle(roleId)}</div>
      {mode === Modes.Normal
        ? <NormalFilter minDate={minDate} maxDate={maxDate} {...state} />
        : <HistoryFilter minDate={minDate} maxDate={maxDate} {...state} />}
      {renderList()}
    </div>
  );
}

MasterWinLossDetailPage.propTypes = propTypes;
export default MasterWinLossDetailPage;