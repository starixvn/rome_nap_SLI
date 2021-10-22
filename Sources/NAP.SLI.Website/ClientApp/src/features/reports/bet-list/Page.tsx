import { useAppDispatch } from 'app/store';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { maxDate } from 'utils/DateUtils';
import { RouteLinks } from 'utils/RouteUtils';
import Filter from './Filter';
import {
  getByBettype,
  getByDate,
  getByMatch,
  resetState,
  selectCustomer,
} from './reducer';
import Table from './Table';

type QueryByDate = {
  fromDate: string;
  toDate: string;
};

type QueryByMatch = {
  matchId: number;
  bettype: number;
  liveIndicator: number;
};

type QueryByBetType = {
  bettype: number;
  fromDate: string;
  toDate: string;
};

type LocationState = Customer & {
  queryByDate?: QueryByDate;
  queryByMatch?: QueryByMatch;
  queryByBetType?: QueryByBetType;
};

const BetListPage = () => {
  const location = useLocation<LocationState>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
  const { queryArg } = useSelector((state: AppState) => state.betList);

  const getDataFromReport = useCallback(async () => {
    setIsLoading(true);

    if (location.state?.queryByDate) {
      const { fromDate, toDate } = location.state.queryByDate;
      const { custId } = location.state;
      await dispatch(
        getByDate({
          custId,
          fromDate,
          toDate,
        }),
      );
    }

    if (location.state?.queryByMatch) {
      const { matchId, bettype, liveIndicator } = location.state.queryByMatch;
      const { custId, roleId } = location.state;
      await dispatch(
        getByMatch({
          matchId,
          bettype,
          liveIndicator,
          custId,
          roleId,
        }),
      );
    }

    if (location.state?.queryByBetType) {
      const { fromDate, toDate, bettype } = location.state.queryByBetType;
      const { custId, roleId } = location.state;
      await dispatch(
        getByBettype({
          bettype,
          fromDate,
          toDate,
          custId,
          roleId,
        }),
      );
    }
    setIsLoading(false);
  }, [location.state, dispatch]);

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

      getDataFromReport();
    }

    return () => {
      dispatch(resetState());
      setKey((prev) => prev + 1);
    };
  }, [dispatch, getDataFromReport, location.state]);

  if (!location.state) {
    return <Redirect to={RouteLinks.HOME} />;
  }
  const { username } = location.state;
  const { fromDate, toDate } = queryArg;
  const isFromReport =
    location.state?.queryByMatch ||
    location.state?.queryByDate ||
    location.state?.queryByBetType;

  return (
    <div className="bet-list-page">
      {isFromReport ? (
        <div className="page-title">
          MEMBER BET LIST {fromDate} --&gt; {toDate} - {username}
        </div>
      ) : (
        <Filter key={key} maxDate={maxDate} />
      )}

      {isLoading ? <Spinner color="primary" /> : <Table />}
    </div>
  );
};

export default BetListPage;
