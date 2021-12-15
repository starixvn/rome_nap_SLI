import { useAppDispatch } from 'app/store';
import { useCustomerParams } from 'features/reports/Page';
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { query, excel, reset } from './reducer';
import Title from '../Title';

const BetListPage = () => {
  const { custId, roleId } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const betType = parseInt(searchParams.get('betType') || '', 10);
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  useEffect(() => {
    dispatch(
      query({
        betType,
        custId,
        roleId,
        fromDate,
        toDate,
      }),
    );
    return () => {
      dispatch(reset());
    };
  }, [dispatch, custId, roleId, betType, fromDate, toDate]);

  const handleExcel = async () => {
    await excel({
      betType,
      custId,
      roleId,
      fromDate,
      toDate,
    });
  };

  return (
    <div className="bet-list-page">
      <Title
        content={`MEMBER BET LIST ${fromDate} --> ${toDate} - ${betType}`}
        handleExcel={handleExcel}
      />
      {/* {isLoading ? <Spinner color="primary" /> : <Table />} */}
    </div>
  );
};

export default BetListPage;
