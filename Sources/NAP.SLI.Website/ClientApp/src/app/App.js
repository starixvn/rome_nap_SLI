import './App.scss';
import React from 'react';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavMenu } from '../common/components/nav/NavMenu';
import { SideBar } from '../common/components/sidebar/SideBar';
import { PrivateRoute } from '../common/components/PrivateRoute';
import { actions as authenticationActions } from '../features/account/authentication/reducer';
import { NotFoundPage } from '../features/error/NotFoundPage';
import { UserManagementPage } from '../features/user-management/UserManagementPage';
import { LoginPage } from '../features/account/authentication/LoginPage';
import { HomePage } from '../features/home/HomePage';
import { ChangePasswordModal } from '../features/account/change-password/ChangePasswordModal';
import { ConfirmBox } from '../common/components/confirm-box/ConfirmBox';
import { RouteLinks } from '../common/models/Constants';
import { CustomerSettingPage } from '../features/customer-setting/CustomerSettingPage';

const App = ({ loggedIn, isOpen }) => {
  return (
    <BrowserRouter>
      <div className={`wrapper ${isOpen ? 'open' : ''}`}>
        {loggedIn && <SideBar />}
        <div className="content">
          {loggedIn && <NavMenu />}
          {loggedIn && <ChangePasswordModal />}
          <div className="main">
            <Switch>
              <Route path="/login" component={LoginPage} location={location} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path={RouteLinks.USER_MANAGEMENT} component={UserManagementPage} />
              <PrivateRoute path={RouteLinks.CUSTOMER_SETTING} component={CustomerSettingPage} />
              <Route component={NotFoundPage} />
            </Switch>
            <ConfirmBox />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

const connectedApp = connect(
  state => Object.assign({}, state.authentication, state.sideBar),
  dispatch => bindActionCreators(authenticationActions, dispatch)
)(App);
export { connectedApp as App };