import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { maxDate } from 'utils/DateUtils';
import { RouteLinks } from 'utils/RouteUtils';
import Filter from './Filter';
import { reset, selectCustomer } from './reducer';
import TableBySuper from './TableBySuper';
import TableByMaster from './TableByMaster';
import TableByAgent from './TableByAgent';
import { CustomerLevels } from 'utils/CustomerLevelUtils';
import { useSelector } from 'react-redux';

const WinLossByBetTypePage = () => {
  const { isQuerying } = useSelector(
    (state: AppState) => state.winLossByBetType,
  );
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

    return function cleanup() {
      dispatch(reset());
    };
  }, [dispatch, location.state]);

  if (!location.state) {
    history.push(RouteLinks.HOME);
    return <></>;
  }

  const { roleId } = location.state;

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
      <div className="page-title">
        Win Loss By Bet Type ({location.state.username})
      </div>
      <Filter maxDate={maxDate} />
      {!isQuerying && renderTable()}
    </div>
  );
};

export default WinLossByBetTypePage;
