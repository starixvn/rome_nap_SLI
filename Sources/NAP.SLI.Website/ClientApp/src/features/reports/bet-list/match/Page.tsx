import { useCustomerParams } from 'features/reports/Page';
import React, { useEffect, useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { query, excel } from './reducer';
import Title from '../Title';
import { QueryArg } from './reducer';
import Table from '../Table';
import { Spinner } from 'reactstrap';
import { QueryData } from '../types';

const usePageParams = () => {
  const { custId, roleId, username } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const matchId = parseInt(searchParams.get('matchId') || '', 10);
  const betType = parseInt(searchParams.get('betType') || '', 10);
  const liveIndicator = parseInt(searchParams.get('liveIndicator') || '', 10);
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  return {
    custId,
    roleId,
    username,
    matchId,
    betType,
    liveIndicator,
    fromDate,
    toDate,
  };
};

const Page = () => {
  const [data, setData] = useState<QueryData | undefined>(undefined);
  const params = usePageParams();
  const {
    custId,
    roleId,
    username,
    matchId,
    betType,
    liveIndicator,
    fromDate,
    toDate,
  } = params;
  const isValid = matchId > 0 && betType > 0 && fromDate && toDate;

  const fetchData = async (queryArg: QueryArg) => {
    const data = await query(queryArg);
    setData(data);
  };

  useEffect(() => {
    if (isValid) {
      fetchData({
        matchId,
        betType,
        liveIndicator,
        custId,
        roleId,
      });
    }
  }, [isValid, custId, roleId, betType, liveIndicator, matchId]);

  if (!isValid) {
    return <Navigate to="/" />;
  }

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
      {data ? (
        <Table data={data} isHappy5LinkedGame={false} />
      ) : (
        <Spinner color="primary" />
      )}
    </div>
  );
};

export default Page;
