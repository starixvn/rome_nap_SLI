import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { RouteLinks } from './common/utils/RouteUtils';

interface PrivateRouteProps extends RouteProps {
  // tslint:disable-next-line:no-any
  component: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {

  const { account } = useSelector((state: RootState) => state.authentication);
  const isLoggined = account !== undefined;

  return (
    <Route {...props} render={props => (
      isLoggined
        ? <React.Component {...props} />
        : <Redirect to={{ pathname: RouteLinks.LOGIN }} />
    )} />
  )
};
export default PrivateRoute;
