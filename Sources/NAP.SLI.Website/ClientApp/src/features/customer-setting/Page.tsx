import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import './Page.scss';

const Page = () => {
  const params = useParams();
  const custId = parseInt(params.custId as string, 10);

  if (custId) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default Page;
