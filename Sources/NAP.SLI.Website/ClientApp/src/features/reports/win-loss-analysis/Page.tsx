import React from 'react';
import { useSelector } from 'react-redux';
// import { minDate, maxDate } from '../../../common/utils/DateUtils';
// import Filter from './Filter';
// import { ReportType } from './reducer';
import Table from './Table';

const WinLossAnalysisPage: React.FC = () => {
  const { data } = useSelector((state: AppState) => state.winLossAnalysis);

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">Win Loss Analysis</div>
      {/* <Filter
        minDate={minDate}
        maxDate={maxDate}
        reportType={ReportType.Daily}
      /> */}
      {data && <Table />}
    </div>
  );
};

export default WinLossAnalysisPage;
