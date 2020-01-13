import './App.scss';
import React from 'react';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import { BrowserRouter, Switch } from "react-router-dom";
import { connect } from 'react-redux';
import { Container } from 'reactstrap';
import { NavMenu, PrivateRoute } from './components';
import { LoginPage, HomePage, NotFoundPage, ChangePasswordModal, CustomerPage, ReportsPage } from './pages';

const App = ({ loggedIn }) => (
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

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired
};

const connectedApp = connect(
  state => state.authentication
)(App);
export { connectedApp as App };