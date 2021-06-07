import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';

type Props = {
  component: React.ElementType,
  path: string,
  isAuthenticated?: boolean,
  exact?: boolean,
};

function PrivateRoute({
  component: Component, isAuthenticated, path, exact,
}: Props) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => (isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to={{
          pathname: '/auth/login',
          state: { from: path },
        }}
        />
      ))}
    />
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

PrivateRoute.defaultProps = {
  isAuthenticated: false,
  exact: false,
};

const PrivateRouteWithRedux = connect(
  mapStateToProps, null,
)(PrivateRoute);

export { PrivateRouteWithRedux as PrivateRoute };
