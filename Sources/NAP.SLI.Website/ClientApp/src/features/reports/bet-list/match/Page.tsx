import { useAppDispatch } from 'app/store';
import { useCustomerParams } from 'features/reports/Page';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getByMatch, reset } from './reducer';
// import Table from '../Table';
// import Title from '../Title';

const BetListPage = () => {
  const { custId, roleId, username } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const matchId = parseInt(searchParams.get('matchId') || '', 10);
  const betType = parseInt(searchParams.get('betType') || '', 10);
  const liveIndicator = parseInt(searchParams.get('liveIndicator') || '', 10);
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  useEffect(() => {
    dispatch(
      getByMatch({
        username,
        matchId,
        betType,
        liveIndicator,
        custId,
        roleId,
        fromDate,
        toDate,
      }),
    );
    return () => {
      dispatch(reset());
    };
  }, [
    dispatch,
    custId,
    roleId,
    username,
    betType,
    liveIndicator,
    matchId,
    fromDate,
    toDate,
  ]);

  return (
    <div className="bet-list-page">
      {/* <Title /> */}
      {/* {isLoading ? <Spinner color="primary" /> : <Table />} */}
    </div>
  );
};

export default BetListPage;
