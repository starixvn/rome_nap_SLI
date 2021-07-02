import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { minDate, maxDate } from 'utils/DateUtils';
import { RouteLinks } from 'utils/RouteUtils';
import Filter from './Filter';
import { selectCustomer } from './reducer';
import Table from './Table';

const WinLossByBetTypePage = () => {
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
  }, [dispatch, location.state]);

  if (!location.state) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  return (
    <div className="win-loss-by-bet-type-page">
      <div className="page-title">
        Win Loss By Bet Type ({location.state.username})
      </div>
      <Filter minDate={minDate} maxDate={maxDate} />
      <Table />
    </div>
  );
};

export default WinLossByBetTypePage;
