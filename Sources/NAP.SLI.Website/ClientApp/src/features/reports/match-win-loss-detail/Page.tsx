import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useCustomerParams } from '../Page';
import Filter from './Filter';
import { reset, selectCustomer } from './reducer';
import Table from './Table';

const Page = () => {
  const { custId, roleId, username } = useCustomerParams();
  const { isQuerying } = useSelector(
    (state: AppState) => state.matchWinLossDetail,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      selectCustomer({
        custId,
        roleId,
        username,
      }),
    );

    return function cleanup() {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, username]);

  return (
    <div className="match-win-loss-detail-page">
      <div className="page-title">Match Win Loss Detail ({username})</div>
      <Filter />
      {!isQuerying && <Table />}
    </div>
  );
};

export default Page;
