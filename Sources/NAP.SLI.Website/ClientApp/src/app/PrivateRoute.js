import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const propTypes = {
  component: PropTypes.any.isRequired,
  location: PropTypes.object
};

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { account } = useSelector(state => state.authentication);

  return (
    <Route {...rest} render={props => (
      account
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: location } }} />
    )} />
  )
};

PrivateRoute.propTypes = propTypes;
export default PrivateRoute;
