import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import './Page.scss';

export const useCustomerSettingParams = () => {
  const params = useParams();
  return {
    custId: parseInt(params.custId as string, 10),
  };
};

const Page = () => {
  const { custId } = useCustomerSettingParams();

  if (custId) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Page;
