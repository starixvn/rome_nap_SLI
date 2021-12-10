import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { query, reset } from './reducer';
import Table from './Table';

const Page = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(query({ custId: parseInt(params.custId as string, 10) }));

    return function cleanup() {
      dispatch(reset());
    };
  }, [params, dispatch]);

  return (
    <div className="customer-setting-page">
      <div className="page-title">Customer Setting</div>
      <Table />
    </div>
  );
};

export default Page;
