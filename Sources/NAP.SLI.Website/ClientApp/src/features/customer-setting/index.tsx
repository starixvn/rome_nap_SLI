import React from 'react';
import { Navigate, Route, useParams } from 'react-router-dom';
import { PrivateRoutes } from 'app/routes';
import CustomerSettingSuperPage from './view-super/Page';
import CustomerSettingMasterPage from './view-master/Page';
import CustomerSettingAgentPage from './view-agent/Page';
import CustomerSettingMemberPage from './view-member/Page';
import './index.scss';

export const useCustomerSettingParams = () => {
  const params = useParams();
  return {
    custId: parseInt(params.custId as string, 10),
  };
};

export const CustomerSettingRoutes = () => {
  return (
    <PrivateRoutes>
      <Route path="super/:custId" element={<CustomerSettingSuperPage />} />
      <Route path="master/:custId" element={<CustomerSettingMasterPage />} />
      <Route path="agent/:custId" element={<CustomerSettingAgentPage />} />
      <Route path="member/:custId" element={<CustomerSettingMemberPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
