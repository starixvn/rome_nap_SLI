import './App.scss';
import React, { useEffect } from 'react';
import { interceptors } from 'axios';
import { Route } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { NavMenu, PrivateRoute } from './components';
import { authenticationActions } from './reducers/Authentication';
import { LoginPage, HomePage, NotFoundPage, ChangePasswordModal, CustomerPage, ReportsPage, UserManagementPage } from './pages';

const App = ({ user, loggedIn, logout }) => {
  useEffect(() => {
    interceptors.request.use(
      config => {
        if (loggedIn) {
          config.headers["Authorization"] = "bearer " + user.token;
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
  }, [loggedIn]);

  return (
    <BrowserRouter>
      <Container fluid>
        {loggedIn && <NavMenu />}
        {loggedIn && <ChangePasswordModal />}
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/customer" component={CustomerPage} />
          <PrivateRoute path="/administration" component={UserManagementPage} />
          <PrivateRoute path="/reports" component={ReportsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

App.propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const connectedApp = connect(
  state => state.authentication,
  dispatch => bindActionCreators(authenticationActions, dispatch)
)(App);
export { connectedApp as App };