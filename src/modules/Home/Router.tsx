import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Home } from './Home';

import { DocumentTitle } from 'shared';

export function Router() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <DocumentTitle title="Dashboard" />
        <Home />
      </Route>
    </Switch>
  );
}
