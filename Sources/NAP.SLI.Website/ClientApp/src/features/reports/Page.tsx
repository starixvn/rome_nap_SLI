import React from 'react';
import { Navigate, Outlet, useSearchParams } from 'react-router-dom';

export const useCustomerParams = (): Customer => {
  const [searchParams] = useSearchParams();
  const custId = parseInt(searchParams.get('custId') || '0', 10);
  const roleId = parseInt(searchParams.get('roleId') || '0', 10);
  const username = searchParams.get('username') || '';
  return {
    custId,
    roleId,
    username,
  };
};

const Page = () => {
  const { custId, roleId, username } = useCustomerParams();
  if (custId > 0 && [1, 2, 3, 4].indexOf(roleId) >= 0 && username) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Page;
