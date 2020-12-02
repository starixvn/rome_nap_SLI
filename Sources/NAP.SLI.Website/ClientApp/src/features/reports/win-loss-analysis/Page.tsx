// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import Filter from './Filter';
import { ReportType } from './reducer';
import WinLossAnalysisDetails from './WinLossAnalysisDetail';

const WinLossAnalysisPage = ({ location }) => {
  const state = location.state || {};
  const { username } = state;
  const { data } = useSelector(state => state.winLossAnalysis);

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">Win Loss Analysis</div>
      <Filter minDate={minDate} maxDate={maxDate} username={username} reportType={ReportType.Daily} {...state} />
      {data && <WinLossAnalysisDetails />}
    </div>
  );
}

export default WinLossAnalysisPage;