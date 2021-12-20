import { useCustomerParams } from 'features/reports';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { query, excel, QueryArg } from './reducer';
import Title from '../Title';
import Table from '../Table';
import { QueryData } from '../types';
import { Spinner } from 'reactstrap';

const usePageParams = () => {
  const { custId, roleId, username } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const betType = parseInt(searchParams.get('betType') || '', 10);
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  return {
    custId,
    roleId,
    username,
    betType,
    fromDate,
    toDate,
  };
};

const Page = () => {
  const [data, setData] = useState<QueryData | undefined>(undefined);
  const { custId, roleId, betType, fromDate, toDate } = usePageParams();
  const isValid = betType > 0 && fromDate && toDate;

  const fetchData = async (queryArg: QueryArg) => {
    const data = await query(queryArg);
    setData(data);
  };

  useEffect(() => {
    if (isValid) {
      fetchData({
        custId,
        roleId,
        betType,
        fromDate,
        toDate,
      });
    }
  }, [isValid, custId, roleId, betType, fromDate, toDate]);

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
      {data ? (
        <Table data={data} isHappy5LinkedGame={false} />
      ) : (
        <Spinner color="primary" />
      )}
    </div>
  );
};

export default Page;
