import React from 'react';
import { useSelector } from 'react-redux';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import Filter from './Filter';
import { ReportType, RootState } from './reducer';
import WinLossAnalysisDetails from './WinLossAnalysisDetail';

type BaseLocation = Location & {
  state: RootState
}

const WinLossAnalysisPage: React.FC<{ location: BaseLocation }> = ({ location }) => {
  const state = location.state;
  const { data } = useSelector((state: RootState) => state.winLossAnalysis);

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">Win Loss Analysis</div>
      <Filter minDate={minDate} maxDate={maxDate} reportType={ReportType.Daily} {...state} />
      {data && <WinLossAnalysisDetails />}
    </div>
  );
}

export default WinLossAnalysisPage;