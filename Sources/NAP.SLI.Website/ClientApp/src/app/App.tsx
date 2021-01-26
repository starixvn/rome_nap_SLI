import './App.scss';
import React, { useEffect } from 'react';
import { Route, Switch, Router } from 'react-router';
import { useSelector } from 'react-redux';
import { createBrowserHistory } from 'history';
import { RouteLinks } from 'utils/RouteUtils';
import NavMenu from 'features/nav/NavMenu';
import SideBar from 'features/sidebar/SideBar';
import PrivateRoute from 'components/PrivateRoute';
import NotFoundPage from 'features/error/not-found/Page';
import UMPage from 'features/error/UM/Page';
import UserManagementPage from 'features/user-management/Page';
import LoginPage from 'features/account/authentication/LoginPage';
import HomePage from 'features/home/Page';
import ChangePasswordModal from 'features/account/change-password/Modal';
import ToastContainer from 'components/toast/ToastContainer';
import CustomerSettingPage from 'features/customer-setting/Page';
import WinLossDetailPage from 'features/reports/win-loss-detail/Page';
import MatchWinLossDetailPage from 'features/reports/match-win-loss-detail/Page';
import WinLossByBetTypePage from 'features/reports/win-loss-by-bet-type/Page';
import WinLossAnalysisPage from 'features/reports/win-loss-analysis/Page';
import BetListPage from 'features/reports/bet-list/Page';
import ResultsPage from 'features/reports/results/Page';
import { startRefreshToken, stopRefreshToken } from 'services/token';
import { startCheckin, stopCheckin } from 'services/connection';

export const history = createBrowserHistory();

const App = () => {
  const { account } = useSelector((state: AppState) => state.authentication);
  const { isOpen } = useSelector((state: AppState) => state.sidebar);
  const { isUnderMaintenanceTime } = useSelector((state: AppState) => state.um);
  const isLoggedIn = account !== undefined;
  const isLayout = isLoggedIn && !isUnderMaintenanceTime;

  useEffect(() => {
    if (isUnderMaintenanceTime) {
      stopCheckin();
      stopRefreshToken();
    } else {
      if (account) {
        startCheckin();
        startRefreshToken();
      } else {
        stopCheckin();
        stopRefreshToken();
      }
    }
  });

  return (
    <Router history={history}>
      <div className={`wrapper ${isOpen && isLayout ? 'open' : ''}`}>
        {isLayout && <SideBar />}
        <div className="content">
          {isLayout && <NavMenu />}
          {isLayout && <ChangePasswordModal />}
          <div className="main">
            <Switch>
              <Route path={RouteLinks.ERROR_UM} component={UMPage} />
              <Route path={RouteLinks.LOGIN} component={LoginPage} />
              <PrivateRoute exact path={RouteLinks.HOME} component={HomePage} />
              <PrivateRoute
                path={RouteLinks.USER_MANAGEMENT}
                component={UserManagementPage}
              />
              <PrivateRoute
                path={RouteLinks.CUSTOMER_SETTING}
                component={CustomerSettingPage}
              />
              <PrivateRoute
                path={RouteLinks.WIN_LOSS_DETAIL}
                component={WinLossDetailPage}
              />
              <PrivateRoute
                path={RouteLinks.MATCH_WIN_LOSS_DETAIL}
                component={MatchWinLossDetailPage}
              />
              <PrivateRoute
                path={RouteLinks.WIN_LOSS_BY_BETTYPE}
                component={WinLossByBetTypePage}
              />
              <PrivateRoute
                path={RouteLinks.WIN_LOSS_ANALYSIS}
                component={WinLossAnalysisPage}
              />
              <PrivateRoute
                path={RouteLinks.BET_LIST}
                component={BetListPage}
              />
              <PrivateRoute path={RouteLinks.RESULTS} component={ResultsPage} />
              <PrivateRoute component={NotFoundPage} />
            </Switch>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
