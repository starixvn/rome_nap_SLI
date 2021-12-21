import React from 'react';
import { Navigate, Outlet, Route, Routes, RoutesProps } from 'react-router-dom';
import { createBrowserHistory } from 'react-router/node_modules/history';
import LoginPage from 'features/account/authentication/LoginPage';
import { UserManagementRoutes } from 'features/user-management';
import { ErrorRoutes } from 'features/error';
import { CustomerSettingRoutes } from 'features/customer-setting';
import { ReportsRoutes } from 'features/reports';
import HomePage from 'features/home/Page';
import storage from 'services/storage';
import { CustomRouter } from 'components/custom-router';
import { PrivateLayout } from 'layout/Private';
import UMPage from 'features/error/UM/Page';

export const history = createBrowserHistory();

export const AppRoutes = () => {
  return (
    <CustomRouter history={history}>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="error/um" element={<UMPage />} />
        <Route
          element={
            <PrivateLayout>
              <Outlet />
            </PrivateLayout>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="user-management/*" element={<UserManagementRoutes />} />
          <Route path="error/*" element={<ErrorRoutes />} />
          <Route
            path="customer-setting/*"
            element={<CustomerSettingRoutes />}
          />
          <Route path="report/*" element={<ReportsRoutes />} />
        </Route>
        <Route path="*" element={<Navigate to="error/not-found" />} />
      </Routes>
    </CustomRouter>
  );
};

export const PrivateRoutes = ({ children, ...rest }: RoutesProps) => {
  const account = storage.get();
  return account ? (
    <Routes {...rest}>{children}</Routes>
  ) : (
    <Navigate to="/login" />
  );
};
