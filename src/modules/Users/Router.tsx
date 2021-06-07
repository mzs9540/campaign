import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { DocumentTitle } from 'shared';

export function Router() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/login`}>
        <DocumentTitle title="Profile" />
        User
      </Route>
    </Switch>
  );
}
