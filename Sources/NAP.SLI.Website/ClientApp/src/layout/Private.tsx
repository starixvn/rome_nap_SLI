import ChangePasswordModal from 'features/account/change-password/Modal';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import storage from 'services/storage';
import NavMenu from './nav/NavMenu';
import SideBar from './sidebar/SideBar';
import SentryFallback from './SentryFallback';
import { ErrorBoundary } from '@sentry/react';

export const PrivateLayout = ({ children }: PropsWithChildren<unknown>) => {
  const { isOpen } = useSelector((state: AppState) => state.sidebar);
  const account = storage.get();

  if (account) {
    return (
      <div className={`wrapper ${isOpen ? 'open' : ''}`}>
        <SideBar />
        <div className="content">
          <NavMenu />
          <ChangePasswordModal />
          <div className="main">
            <ErrorBoundary
              beforeCapture={(scope) => {
                scope.setTag('location', 'private');
              }}
              fallback={SentryFallback}
            >
              {children}
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};
