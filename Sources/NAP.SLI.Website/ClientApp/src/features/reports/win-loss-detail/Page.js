import React from 'react';
import PropTypes from 'prop-types';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import { useSelector } from 'react-redux';
import { getDownlineLevel, getLevelName } from '../../../common/models/CustomerLevel';
import Table from './Table';

const propTypes = {
  location: PropTypes.object.isRequired
};

const Modes = {
  Normal: 1,
  History: 2
}

const MasterWinLossDetailPage = ({ location }) => {
  const state = location.state || {};
  const { roleId, username } = state;
  const { mode, data } = useSelector(state => state.winLossDetail);

  return (
    <div className="win-loss-detail-page">
      <div className="page-title">{getLevelName(getDownlineLevel(roleId)) + ' Win Loss Detail'} ({username})</div>
      {mode === Modes.Normal
        ? <NormalFilter minDate={minDate} maxDate={maxDate} {...state} />
        : <HistoryFilter minDate={minDate} maxDate={maxDate} {...state} />}
      {data && <Table />}
    </div>
  );
}

MasterWinLossDetailPage.propTypes = propTypes;
export default MasterWinLossDetailPage;