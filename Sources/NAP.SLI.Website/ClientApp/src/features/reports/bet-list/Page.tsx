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

type WinLossDetail = {
  fromDate: string;
  toDate: string;
};

type MatchWinLossDetail = {
  matchId: number;
  bettype: number;
  liveIndicator: number;
};

type WinLossByBetType = {
  bettype: number;
  fromDate: string;
  toDate: string;
};

type LocationState = Customer & {
  winLossDetail?: WinLossDetail;
  matchWinLossDetail?: MatchWinLossDetail;
  winLossByBetType?: WinLossByBetType;
};

const BetListPage = () => {
  const location = useLocation<LocationState>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(0);
  const { queryArg } = useSelector((state: AppState) => state.betList);

  const getDataFromReport = useCallback(async () => {
    setIsLoading(true);
    if (location.state?.winLossDetail) {
      // const { custId, fromDate, toDate } = location.state.winLossDetail;
      await dispatch(
        getByDate({
          custId: 46755897,
          fromDate: '2021-08-31',
          toDate: '2021-09-30',
        }),
      );
    }

    if (location.state?.matchWinLossDetail) {
      await dispatch(
        getByMatch({
          matchId: 99000074,
          bettype: 85,
          liveIndicator: 1,
          custId: 1015419,
          roleId: 4,
        }),
      );
    }

    if (location.state?.winLossByBetType) {
      await dispatch(
        getByBettype({
          bettype: 3601,
          fromDate: '2021-09-03',
          toDate: '2021-09-30',
          custId: 1015419,
          roleId: 4,
        }),
      );
    }
    setIsLoading(false);
  }, [
    dispatch,
    location.state?.matchWinLossDetail,
    location.state?.winLossByBetType,
    location.state?.winLossDetail,
  ]);

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
    location.state?.matchWinLossDetail ||
    location.state?.winLossDetail ||
    location.state?.winLossByBetType;

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
