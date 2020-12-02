// @ts-nocheck
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { account } = useSelector((state: RootState) => state.authentication);
  const isLoggined = account !== undefined;

  return (
    <Route {...rest} render={props => (
      isLoggined
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login' }} />
    )} />
  )
};

PrivateRoute.propTypes = propTypes;
export default PrivateRoute;
