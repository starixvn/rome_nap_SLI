import './App.scss';
import React, { useEffect } from 'react';
import {
  Route,
  Routes,
  Navigate,
  BrowserRouter,
  Outlet,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavMenu from 'features/nav/NavMenu';
import SideBar from 'features/sidebar/SideBar';
import NotFoundPage from 'features/error/not-found/Page';
import UMPage from 'features/error/UM/Page';
import UserManagementPage from 'features/user-management/Page';
import LoginPage from 'features/account/authentication/LoginPage';
import HomePage from 'features/home/Page';
import ChangePasswordModal from 'features/account/change-password/Modal';
import ToastContainer from 'components/toast/ToastContainer';
import CustomerSettingPage from 'features/customer-setting/Page';
import CustomerSettingSuperPage from 'features/customer-setting/view-super/Page';
import CustomerSettingMasterPage from 'features/customer-setting/view-master/Page';
import CustomerSettingAgentPage from 'features/customer-setting/view-agent/Page';
import CustomerSettingMemberPage from 'features/customer-setting/view-member/Page';
import ReportPage from 'features/reports/Page';
import WinLossDetailPage from 'features/reports/win-loss-detail/Page';
import MatchWinLossDetailPage from 'features/reports/match-win-loss-detail/Page';
import WinLossByBetTypePage from 'features/reports/win-loss-by-bet-type/Page';
import WinLossAnalysisPage from 'features/reports/win-loss-analysis/Page';
import BetListMatchPage from 'features/reports/bet-list/match/Page';
import ResultsPage from 'features/reports/results/Page';
import { startCheckin, stopCheckin } from 'services/connection';

const RequireAuth = (props: { children: JSX.Element }) => {
  const { account } = useSelector((state: AppState) => state.authentication);
  const isAuthenticated = account !== undefined;

  return isAuthenticated ? props.children : <Navigate to="login" />;
};

const App = () => {
  const { account } = useSelector((state: AppState) => state.authentication);
  const { isOpen } = useSelector((state: AppState) => state.sidebar);
  const { isUnderMaintenanceTime } = useSelector((state: AppState) => state.um);
  const isLoggedIn = account !== undefined;
  const isLayout = isLoggedIn && !isUnderMaintenanceTime;

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
    <BrowserRouter>
      <div className={`wrapper ${isOpen && isLayout ? 'open' : ''}`}>
        {isLayout && <SideBar />}
        <div className="content">
          {isLayout && <NavMenu />}
          {isLayout && <ChangePasswordModal />}
          <div className="main">
            <Routes>
              <Route path="error/um" element={<UMPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route
                element={
                  <RequireAuth>
                    <Outlet />
                  </RequireAuth>
                }
              >
                <Route path="/" element={<HomePage />} />
                <Route
                  path="user-management"
                  element={<UserManagementPage />}
                />
                <Route
                  path="customer-setting"
                  element={<CustomerSettingPage />}
                >
                  <Route
                    path="super/:custId"
                    element={<CustomerSettingSuperPage />}
                  />
                  <Route
                    path="master/:custId"
                    element={<CustomerSettingMasterPage />}
                  />
                  <Route
                    path="agent/:custId"
                    element={<CustomerSettingAgentPage />}
                  />
                  <Route
                    path="member/:custId"
                    element={<CustomerSettingMemberPage />}
                  />
                </Route>
                <Route path="report" element={<ReportPage />}>
                  <Route
                    path="win-loss-detail"
                    element={<WinLossDetailPage />}
                  />
                  <Route
                    path="match-win-loss-detail"
                    element={<MatchWinLossDetailPage />}
                  />
                  <Route
                    path="win-loss-by-bettype"
                    element={<WinLossByBetTypePage />}
                  />
                  <Route
                    path="win-loss-analysis"
                    element={<WinLossAnalysisPage />}
                  />
                  <Route path="bet-list">
                    <Route path="match" element={<BetListMatchPage />} />
                  </Route>
                  <Route path="results" element={<ResultsPage />} />
                </Route>
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
