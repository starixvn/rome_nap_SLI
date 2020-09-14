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
import { Container } from 'reactstrap';

const App = ({ loggedIn, isOpen }) => {
  return (
    <BrowserRouter>
      <div className={`wrapper ${isOpen ? 'open' : ''}`}>
        {loggedIn && <div className="sidebar"><SideBar /></div>}
        <div className="content">
          {loggedIn && <NavMenu />}
          {loggedIn && <ChangePasswordModal />}
          <Container fluid className="main">
            <Switch>
              <Route path="/login" component={LoginPage} location={location} />
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
  loggedIn: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired
};

const connectedApp = connect(
  state => Object.assign({}, state.authentication, state.sideBar),
  dispatch => bindActionCreators(authenticationActions, dispatch)
)(App);
export { connectedApp as App };