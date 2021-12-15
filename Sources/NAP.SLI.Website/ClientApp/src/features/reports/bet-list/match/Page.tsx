import { useAppDispatch } from 'app/store';
import { useCustomerParams } from 'features/reports/Page';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { query, excel, reset } from './reducer';
import Title from '../Title';

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
      query({
        matchId,
        betType,
        liveIndicator,
        custId,
        roleId,
      }),
    );
    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, betType, liveIndicator, matchId]);

  const handleExcel = async () => {
    await excel({
      matchId,
      betType,
      liveIndicator,
      custId,
      roleId,
    });
  };

  return (
    <div className="bet-list-page">
      <Title
        content={`MEMBER BET LIST ${fromDate} --> ${toDate} - ${username}`}
        handleExcel={handleExcel}
      />
      {/* {isLoading ? <Spinner color="primary" /> : <Table />} */}
    </div>
  );
};

export default BetListPage;
