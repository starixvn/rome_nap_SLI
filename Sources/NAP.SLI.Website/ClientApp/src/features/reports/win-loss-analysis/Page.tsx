import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { minDate, maxDate } from '../../../common/utils/DateUtils';
import { RouteLinks } from '../../../common/utils/RouteUtils';
import Filter from './Filter';
import { ReportType, selectCustomer } from './reducer';
import WinLossAnalysisDetails from './Table';

const WinLossAnalysisPage = () => {
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useDispatch();
  const state = location.state;
  const { data } = useSelector((state: AppState) => state.winLossAnalysis);

  useEffect(() => {
    if (!location.state) {
      history.push(RouteLinks.HOME);
      return;
    }

    const { custId, roleId, username } = location.state;

    dispatch(
      selectCustomer({
        customer: {
          custId,
          roleId,
          username,
        },
        isReset: true,
      }),
    );
  }, [location]);

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">Win Loss Analysis</div>
      <Filter
        minDate={minDate}
        maxDate={maxDate}
        reportType={ReportType.Daily}
        {...state}
      />
      {data && <WinLossAnalysisDetails />}
    </div>
  );
};

export default WinLossAnalysisPage;
