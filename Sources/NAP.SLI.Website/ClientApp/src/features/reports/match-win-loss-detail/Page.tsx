import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { minDate, maxDate } from 'utils/DateUtils';
import { RouteLinks } from 'utils/RouteUtils';
import Filter from './Filter';
import { selectCustomer } from './reducer';
import Table from './Table';

const Page = () => {
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
    <div className="match-win-loss-detail-page">
      <div className="page-title">
        Match Win Loss Detail ({location.state.username})
      </div>
      <Filter minDate={minDate} maxDate={maxDate} />
      <Table />
    </div>
  );
};

export default Page;
