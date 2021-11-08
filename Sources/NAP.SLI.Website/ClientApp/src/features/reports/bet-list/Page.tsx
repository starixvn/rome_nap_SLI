import { useAppDispatch } from 'app/store';
import React, { useCallback, useEffect, useState } from 'react';
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
  selectArg,
  selectCustomer,
} from './reducer';
import Table from './Table';
import Title from './Title';

type QueryByDate = {
  fromDate: string;
  toDate: string;
};

type QueryByMatch = {
  matchId: number;
  bettype: number;
  liveIndicator: number;
  fromDate: string;
  toDate: string;
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
      const {
        matchId,
        bettype,
        liveIndicator,
        fromDate,
        toDate,
      } = location.state.queryByMatch;
      const { custId, roleId } = location.state;
      dispatch(selectArg({ fromDate, toDate }));
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

  const isFromReport =
    location.state?.queryByMatch ||
    location.state?.queryByDate ||
    location.state?.queryByBetType;

  return (
    <div className="bet-list-page">
      {isFromReport ? <Title /> : <Filter key={key} maxDate={maxDate} />}
      {isLoading ? <Spinner color="primary" /> : <Table />}
    </div>
  );
};

export default BetListPage;
