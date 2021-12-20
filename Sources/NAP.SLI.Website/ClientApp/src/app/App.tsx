import './App.scss';
import React, { useEffect } from 'react';
import { AppRoutes } from './routes';
import { useSelector } from 'react-redux';
import { startCheckin, stopCheckin } from 'services/connection';
import storage from 'services/storage';
import { MainLayout } from 'layout/Main';
import ToastContainer from 'components/toast/ToastContainer';

const App = () => {
  const { isUnderMaintenanceTime } = useSelector((state: AppState) => state.um);
  const account = storage.get();

  useEffect(() => {
    if (isUnderMaintenanceTime) {
      stopCheckin();
    } else {
      if (account) {
        startCheckin();
      } else {
        stopCheckin();
      }
    }
  });

  return (
    <MainLayout>
      <AppRoutes />
      <ToastContainer />
    </MainLayout>
  );
};

export default App;
