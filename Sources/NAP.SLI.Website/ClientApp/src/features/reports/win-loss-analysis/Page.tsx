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

  if (!location.state) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  const { custId, roleId, username } = location.state;

  useEffect(() => {
    dispatch(
      selectCustomer({
        custId,
        roleId,
        username,
      }),
    );
  }, [location]);

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">Win Loss Analysis ({username}</div>
      <Filter minDate={minDate} maxDate={maxDate} />
      <Table />
    </div>
  );
};

export default Page;
