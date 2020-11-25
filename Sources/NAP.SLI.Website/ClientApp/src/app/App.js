import './App.scss';
import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavMenu from '../features/nav/NavMenu';
import SideBar from '../features/sidebar/SideBar';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from '../features/error/NotFoundPage';
import UserManagementPage from '../features/user-management/Page';
import LoginPage from '../features/account/authentication/LoginPage';
import HomePage from '../features/home/Page';
import ChangePasswordModal from '../features/account/change-password/Modal';
import { ConfirmBox } from '../common/components/confirm-box/ConfirmBox';
import ToastContainer from '../common/components/toast/ToastContainer';
import { RouteLinks } from '../common/models/Constants';
import CustomerSettingPage from '../features/customer-setting/Page';
import MasterWinLossDetailPage from '../features/reports/master-win-loss-detail/Page';
import { MatchWinLossDetailPage } from '../features/reports/match-win-loss-detail/MatchWinLossDetailPage';
import { WinLossByBetTypePage } from '../features/reports/win-loss-by-bet-type/WinLossByBetTypePage';
import { WinLossAnalysisPage } from '../features/reports/win-loss-analysis/WinLossAnalysisPage';

const App = () => {
  const { account } = useSelector(state => state.authentication);
  const { isOpen } = useSelector(state => state.sidebar);

  return (
    <BrowserRouter>
      <div className={`wrapper ${isOpen ? 'open' : ''}`}>
        {account && <SideBar />}
        <div className="content">
          {account && <NavMenu />}
          {account && <ChangePasswordModal />}
          <div className="main">
            <Switch>
              <Route path="/login" component={LoginPage} location={location} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path={RouteLinks.USER_MANAGEMENT} component={UserManagementPage} />
              <PrivateRoute path={RouteLinks.CUSTOMER_SETTING} component={CustomerSettingPage} />
              <PrivateRoute path={RouteLinks.MASTER_WIN_LOSS_DETAIL} component={MasterWinLossDetailPage} />
              <PrivateRoute path={RouteLinks.MATCH_WIN_LOSS_DETAIL} component={MatchWinLossDetailPage} />
              <PrivateRoute path={RouteLinks.WIN_LOSS_BY_BETTYPE} component={WinLossByBetTypePage} />
              <PrivateRoute path={RouteLinks.WIN_LOSS_ANALYSIS} component={WinLossAnalysisPage} />
              <Route component={NotFoundPage} />
            </Switch>
            {/* <ConfirmBox /> */}
          </div>
        </div>
      </div>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;