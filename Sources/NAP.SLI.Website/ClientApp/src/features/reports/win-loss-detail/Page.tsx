import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { minDate, maxDate } from 'utils/DateUtils';
import { useSelector } from 'react-redux';
import Table from './Table';
import { selectCustomer } from './reducer';
import { RouteLinks } from 'utils/RouteUtils';
import { useAppDispatch } from 'app/store';
import Title from './Title';

const Page = () => {
  const history = useHistory();
  const location = useLocation<Customer>();
  const dispatch = useAppDispatch();
  const { queryArg } = useSelector((state: AppState) => state.winLossDetail);

  useEffect(() => {
    if (location.state) {
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
    }
  }, [dispatch, location.state]);

  if (!location.state) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  const { isHistory } = queryArg;

  return (
    <div className="win-loss-detail-page">
      <Title />
      {isHistory ? (
        <HistoryFilter minDate={minDate} maxDate={maxDate} />
      ) : (
        <NormalFilter minDate={minDate} maxDate={maxDate} />
      )}
      <Table />
    </div>
  );
};

export default Page;
