import './App.scss';
import React, { useEffect } from 'react';
import { AppRoutes } from './routes';
import { checkin } from 'services/connection';
import { MainLayout } from 'layout/Main';
import ToastContainer from 'components/toast/ToastContainer';

const App = () => {
  useEffect(() => {
    checkin();
  });

  return (
    <MainLayout>
      <AppRoutes />
      <ToastContainer />
    </MainLayout>
  );
};

export default App;
