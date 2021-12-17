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
    (state: AppState) => state.winLossAnalysis,
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

    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, username]);

  return (
    <div className="win-loss-analysis-page">
      <div className="page-title">Win Loss Analysis ({username})</div>
      <Filter />
      {!isQuerying && <Table />}
    </div>
  );
};

export default Page;
