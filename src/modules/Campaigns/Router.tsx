import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Form } from './Form';

import { DocumentTitle } from 'shared';

export function Router() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <DocumentTitle title="Live Batches" />
        <Form />
      </Route>
    </Switch>
  );
}
