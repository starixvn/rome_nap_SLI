import React, { useState } from 'react';
import { useCustomerParams } from 'features/reports';
import Filter from './Filter';
import Title from './Title';
import Table from './Table';
import { QueryData } from './types';

const Page = () => {
  const [data, setData] = useState<QueryData | undefined>(undefined);
  const { username } = useCustomerParams();

  return (
    <div className="bet-list-page">
      <Title content={`MEMBER BET LIST - ${username}`} />
      <Filter setData={setData} />
      {data !== undefined && <Table data={data} isHappy5LinkedGame={false} />}
    </div>
  );
};

export default Page;
