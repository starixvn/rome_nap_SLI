import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { maxDate } from 'utils/DateUtils';
import { RouteLinks } from 'utils/RouteUtils';
import Filter from './Filter';
import { reset, selectCustomer } from './reducer';
import Table from './Table';

const Page = () => {
  const { isQuerying } = useSelector(
    (state: AppState) => state.winLossAnalysis,
  );
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (location.state) {
      const { custId, roleId, username } = location.state;
      dispatch(
        selectCustomer({
          custId,
          roleId,
          username,
        }),
      );
    }

    return function cleanup() {
      dispatch(reset());
    };
  }, [dispatch, location.state]);

  if (!location.state) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">
        Win Loss Analysis ({location.state.username})
      </div>
      <Filter />
      {!isQuerying && <Table />}
    </div>
  );
};

export default Page;
