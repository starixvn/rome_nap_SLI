import './App.scss';
import React, { useEffect } from 'react';
import { interceptors } from 'axios';
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
import { Container } from 'reactstrap';

const App = ({ account, loggedIn, logout, isOpen }) => {
  useEffect(() => {
    interceptors.request.use(
      config => {
        if (loggedIn) {
          config.headers['Authorization'] = 'bearer ' + account.token;
        }

        return config;
      }
    );
    interceptors.response.use(
      response => response,
      error => {
        if (error.response.status === 401) {
          logout();
        }

        return Promise.reject(error.response);
      });
  });

  return (
    <BrowserRouter>
      <div className={`wrapper ${isOpen ? 'open' : ''}`}>
        {loggedIn && <div className="sidebar"><SideBar /></div>}
        <div className="content">
          {loggedIn && <NavMenu />}
          {loggedIn && <ChangePasswordModal />}
          <Container fluid className="main">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <PrivateRoute exact path="/" component={HomePage} />
              <PrivateRoute path="/administration" component={UserManagementPage} />
              <Route component={NotFoundPage} />
            </Switch>
          </Container>
        </div>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  account: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired
};

const connectedApp = connect(
  state => Object.assign({}, state.authentication, state.sideBar),
  dispatch => bindActionCreators(authenticationActions, dispatch)
)(App);
export { connectedApp as App };