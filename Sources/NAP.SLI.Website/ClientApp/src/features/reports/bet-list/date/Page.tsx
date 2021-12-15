import { useAppDispatch } from 'app/store';
import { useCustomerParams } from 'features/reports/Page';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { query, excel, reset } from './reducer';
// import Table from '../Table';
import Title from '../Title';

const BetListPage = () => {
  const { custId, username } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';

  useEffect(() => {
    dispatch(
      query({
        custId,
        fromDate,
        toDate,
      }),
    );
    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, fromDate, toDate]);

  const handleExcel = async () => {
    await excel({
      custId,
      fromDate,
      toDate,
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
