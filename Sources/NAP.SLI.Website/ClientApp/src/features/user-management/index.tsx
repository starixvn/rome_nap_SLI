import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { PrivateRoutes } from 'app/routes';
import UserManagementPage from './Page';

export const UserManagementRoutes = () => {
  return (
    <PrivateRoutes>
      <Route index element={<UserManagementPage />} />
      <Route path="*" element={<Navigate to="." />} />
    </PrivateRoutes>
  );
};
