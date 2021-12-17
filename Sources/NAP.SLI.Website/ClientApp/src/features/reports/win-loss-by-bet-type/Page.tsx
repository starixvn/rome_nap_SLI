import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import Filter from './Filter';
import { reset, selectCustomer } from './reducer';
import TableBySuper from './TableBySuper';
import TableByMaster from './TableByMaster';
import TableByAgent from './TableByAgent';
import { CustomerLevels } from 'utils/CustomerLevelUtils';
import { useSelector } from 'react-redux';
import { useCustomerParams } from '../Page';

const WinLossByBetTypePage = () => {
  const { custId, roleId, username } = useCustomerParams();
  const { isQuerying } = useSelector(
    (state: AppState) => state.winLossByBetType,
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

  const renderTable = () => {
    switch (roleId) {
      case CustomerLevels.Super:
        return <TableBySuper />;
      case CustomerLevels.Master:
        return <TableByMaster />;
      case CustomerLevels.Agent:
        return <TableByAgent />;
    }

    return <></>;
  };

  return (
    <div className="win-loss-by-bet-type-page">
      <div className="page-title">Win Loss By Bet Type ({username})</div>
      <Filter />
      {!isQuerying && renderTable()}
    </div>
  );
};

export default WinLossByBetTypePage;
