import React, { useEffect, useState } from 'react';
import Filter from './Filter';
import { maxDate } from 'utils/DateUtils';
import { Redirect, useLocation } from 'react-router-dom';
import { useAppDispatch } from 'app/store';
import { resetArg, selectCustomer } from './reducer';
import { RouteLinks } from 'utils/RouteUtils';
import { useSelector } from 'react-redux';

const BetListPage = () => {
  const location = useLocation<Customer>();
  const dispatch = useAppDispatch();
  const { queryArg, queryData } = useSelector(
    (state: AppState) => state.betList,
  );
  const [key, setKey] = useState(0);

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

    return () => {
      dispatch(resetArg());
      setKey((prev) => prev + 1);
    };
  }, [dispatch, location.state]);

  if (!location.state) {
    return <Redirect to={RouteLinks.HOME} />;
  }

  const { fromDate, toDate } = queryArg;
  const { username } = location.state;

  return (
    <div className="bet-list-page">
      <div className="page-title">
        MEMBER BET LIST {fromDate} --&gt; {toDate} - {username}
      </div>
      <Filter key={key} maxDate={maxDate} />
      {queryData?.data}
    </div>
  );
};

export default BetListPage;
