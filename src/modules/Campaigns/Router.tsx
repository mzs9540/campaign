import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import { Form } from './Form';

import { BodyLayout } from 'layouts';
import { DocumentTitle } from 'shared';

export function Router() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/create`}>
        <DocumentTitle title="Create Campaign" />
        <BodyLayout>
          <Form />
        </BodyLayout>
      </Route>
    </Switch>
  );
}
