import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RouteLinks } from 'utils/RouteUtils';

type Props = RouteProps & {
  component: React.FC;
};

const PrivateRoute = ({ component: Component, ...rest }: Props) => {
  const { account } = useSelector((state: AppState) => state.authentication);
  const isLoggined = account !== undefined;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggined ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: RouteLinks.LOGIN }} />
        )
      }
    />
  );
};
export default PrivateRoute;
