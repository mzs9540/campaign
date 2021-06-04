import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { SignIn } from './SignIn';
import { SignUp } from './SignUp';

import { DocumentTitle } from 'shared';

export function Router() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/login`}>
        <DocumentTitle title="Sign in" />
        <SignIn />
      </Route>

      <Route exact path={`${path}/signup`}>
        <DocumentTitle title="Register with us" />
        <SignUp />
      </Route>
    </Switch>
  );
}
