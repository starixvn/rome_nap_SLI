import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ loggedIn, component: Component, location, ...rest }) => (
  <Route {...rest} render={props => (
    loggedIn
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: location } }} />
  )} />
);

PrivateRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.any.isRequired,
  location: PropTypes.object
};

const connectedPrivateRoute = connect(
  state => state.authentication
)(PrivateRoute);

export { connectedPrivateRoute as PrivateRoute };
