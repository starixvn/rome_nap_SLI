import './App.scss';
import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteLinks } from './common/utils/RouteUtils';
import NavMenu from './features/nav/NavMenu';
import SideBar from './features/sidebar/SideBar';
import PrivateRoute from './PrivateRoute';
import NotFoundPage from './features/error/NotFoundPage';
import UserManagementPage from './features/user-management/Page';
import LoginPage from './features/account/authentication/LoginPage';
import HomePage from './features/home/Page';
import ChangePasswordModal from './features/account/change-password/Modal';
import Confirmation from './common/components/confirmation/Confirmation';
import ToastContainer from './common/components/toast/ToastContainer';
import CustomerSettingPage from './features/customer-setting/Page';
import WinLossDetailPage from './features/reports/win-loss-detail/Page';
import MatchWinLossDetailPage from './features/reports/match-win-loss-detail/Page';
import WinLossByBetTypePage from './features/reports/win-loss-by-bet-type/Page';
import WinLossAnalysisPage from './features/reports/win-loss-analysis/Page';
import BetListPage from './features/reports/bet-list/Page';
import ResultsPage from './features/reports/results/Page';
import { RootState } from './store';

const App = () => {
  const { account } = useSelector((state: RootState) => state.authentication);
  const { isOpen } = useSelector((state: RootState) => state.sidebar);
  const isLoggedIn = account !== undefined;

  return (
    <BrowserRouter>
      <div className={`wrapper ${isOpen && isLoggedIn ? 'open' : ''}`}>
        {isLoggedIn && <SideBar />}
        <div className="content">
          {isLoggedIn && <NavMenu />}
          {isLoggedIn && <ChangePasswordModal />}
          <div className="main">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path={RouteLinks.USER_MANAGEMENT} component={UserManagementPage} />
              <PrivateRoute path={RouteLinks.CUSTOMER_SETTING} component={CustomerSettingPage} />
              <PrivateRoute path={RouteLinks.WIN_LOSS_DETAIL} component={WinLossDetailPage} />
              <PrivateRoute path={RouteLinks.MATCH_WIN_LOSS_DETAIL} component={MatchWinLossDetailPage} />
              <PrivateRoute path={RouteLinks.WIN_LOSS_BY_BETTYPE} component={WinLossByBetTypePage} />
              <PrivateRoute path={RouteLinks.WIN_LOSS_ANALYSIS} component={WinLossAnalysisPage} />
              <PrivateRoute path={RouteLinks.BET_LIST} component={BetListPage} />
              <PrivateRoute path={RouteLinks.RESULTS} component={ResultsPage} />
              <PrivateRoute component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </div>
      <Confirmation />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;