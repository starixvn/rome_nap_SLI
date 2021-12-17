import React, { useEffect } from 'react';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { useSelector } from 'react-redux';
import Table from './Table';
import { selectCustomer, reset } from './reducer';
import { useAppDispatch } from 'app/store';
import Title from './Title';
import { useCustomerParams } from '../Page';
import './Page.scss';

const Page = () => {
  const { custId, roleId, username } = useCustomerParams();
  const dispatch = useAppDispatch();
  const { queryArg, isQuerying } = useSelector(
    (state: AppState) => state.winLossDetail,
  );
  const { isHistory } = queryArg;

  useEffect(() => {
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

    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, username]);

  return (
    <div className="win-loss-detail-page">
      <Title />
      {isHistory ? <HistoryFilter /> : <NormalFilter />}
      {!isQuerying && <Table />}
    </div>
  );
};

export default Page;
