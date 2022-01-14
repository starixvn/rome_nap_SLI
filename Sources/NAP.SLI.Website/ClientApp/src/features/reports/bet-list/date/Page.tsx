import { useCustomerParams } from 'features/reports';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { query, excel } from './service';
import Table from '../Table';
import Title from '../Title';
import { QueryData } from '../types';
import { Spinner } from 'reactstrap';

const usePageParams = () => {
  const { custId, roleId, username } = useCustomerParams();
  const [searchParams] = useSearchParams();
  const fromDate = searchParams.get('fromDate') || '';
  const toDate = searchParams.get('toDate') || '';
  return {
    custId,
    roleId,
    username,
    fromDate,
    toDate,
  };
};

const Page = () => {
  const [data, setData] = useState<QueryData | undefined>(undefined);
  const { custId, username, fromDate, toDate } = usePageParams();
  const isValid = fromDate && toDate;

  useEffect(() => {
    if (isValid) {
      query({
        custId,
        fromDate,
        toDate,
      }).then((data) => setData(data));
    }
  }, [isValid, custId, fromDate, toDate]);

  const handleExcel = async () => {
    await excel({
      custId,
      fromDate,
      toDate,
      username,
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
