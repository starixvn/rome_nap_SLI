import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteLinks } from './common/utils/RouteUtils';

type Props = RouteProps & {
  component: any;
};

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { account } = useSelector((state: RootState) => state.authentication);
  const isLoggined = account !== undefined;

  return (
    <Route {...rest} render={props => (
      isLoggined
        ? <Component {...props} />
        : <Redirect to={{ pathname: RouteLinks.LOGIN }} />
    )} />
  )
};
export default PrivateRoute;
