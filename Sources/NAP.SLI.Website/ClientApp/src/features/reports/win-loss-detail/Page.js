import React from 'react';
import PropTypes from 'prop-types';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import { useSelector } from 'react-redux';
import { CustomerLevels } from '../../../common/models/CustomerLevel';
import MasterList from './MasterList';

const propTypes = {
  location: PropTypes.object.isRequired
};

const Modes = {
  Normal: 1,
  History: 2
}

const MasterWinLossDetailPage = ({ location }) => {
  const state = location.state || {};
  const { custId, roleId } = state;
  const { mode } = useSelector(state => state.winLossDetail);

  const getPrefixTitle = () => {
    switch (roleId) {
      case CustomerLevels.Super:
        return 'Master';
      case CustomerLevels.Master:
        return 'Agent';
      case CustomerLevels.Agent:
        return 'Member';
    }
  }

  const renderList = () => {
    switch (roleId) {
      case CustomerLevels.Super:
        return <MasterList />;
    }
  }

  return (
    <div className="win-loss-detail-page">
      <div className="page-title">{getPrefixTitle()} Win Loss Detail</div>
      {mode === Modes.Normal
        ? <NormalFilter custId={custId} minDate={minDate} maxDate={maxDate} {...state} />
        : <HistoryFilter custId={custId} minDate={minDate} maxDate={maxDate} {...state} />}
      {renderList()}
    </div>
  );
}

MasterWinLossDetailPage.propTypes = propTypes;
export default MasterWinLossDetailPage;