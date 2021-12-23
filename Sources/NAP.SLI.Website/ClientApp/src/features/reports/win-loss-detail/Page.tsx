import React, { useEffect } from 'react';
import NormalFilter from './NormalFilter';
import HistoryFilter from './HistoryFilter';
import { useSelector } from 'react-redux';
import Table from './Table';
import { select, reset } from './reducer';
import { useAppDispatch } from 'app/store';
import Title from './Title';
import { useCustomerParams } from 'features/reports';
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
      select({
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
    <div className="win-loss-detail-page">
      <Title />
      {isHistory ? <HistoryFilter /> : <NormalFilter />}
      {!isQuerying && <Table />}
    </div>
  );
};

export default Page;
