import ChangePasswordModal from 'features/account/change-password/Modal';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import storage from 'services/storage';
import NavMenu from './nav/NavMenu';
import SideBar from './sidebar/SideBar';

type Props = PropsWithChildren<unknown>;

export const PrivateLayout = ({ children }: Props) => {
  const { isOpen } = useSelector((state: AppState) => state.sidebar);
  const account = storage.get();

  if (account) {
    return (
      <div className={`wrapper ${isOpen ? 'open' : ''}`}>
        <SideBar />
        <div className="content">
          <NavMenu />
          <ChangePasswordModal />
          <div className="main">{children}</div>
        </div>
      </div>
    );
  } else {
    return <Navigate to="/login" />;
  }
};
