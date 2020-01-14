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
import { LoginPage, HomePage, NotFoundPage, ChangePasswordModal, CustomerPage, ReportsPage } from './pages';

const App = ({ loggedIn, logout }) => {
  useEffect(() => {
    interceptors.response.use((response) => {
      return response;
    }, function (error) {
      if (error.response.status === 401) {
        logout();
      }

      return Promise.reject(error.response);
    });
  });

  return (
    <BrowserRouter>
      <Container fluid>
        {loggedIn && <NavMenu />}
        {loggedIn && <ChangePasswordModal />}
        <Switch>
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/" component={HomePage} />
          <PrivateRoute path="/customer" component={CustomerPage} />
          <PrivateRoute path="/reports" component={ReportsPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired
};

const connectedApp = connect(
  state => state.authentication,
  dispatch => bindActionCreators(authenticationActions, dispatch)
)(App);
export { connectedApp as App };