import { useAppDispatch } from 'app/store';
import React, { useEffect } from 'react';
import { useCustomerSettingParams } from '../';
import { query, reset } from './reducer';
import Table from './Table';

const Page = () => {
  const { custId } = useCustomerSettingParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const promise = dispatch(query({ custId }));

    return () => {
      promise.abort();
      dispatch(reset());
    };
  }, [custId, dispatch]);

  return (
    <div className="customer-setting-page">
      <div className="page-title">Customer Setting</div>
      <Table />
    </div>
  );
};

export default Page;
