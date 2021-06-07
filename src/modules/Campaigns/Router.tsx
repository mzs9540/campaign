import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import './Shared.scss';

import { Form } from './Form';
import { Campaigns } from './Campaigns';
import { Details } from './Details';

import { BodyLayout } from 'layouts';
import { DocumentTitle } from 'shared';

export function Router() {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}/:campaignId/update`}>
        <DocumentTitle title="Update Campaign" />
        <BodyLayout>
          <Form />
        </BodyLayout>
      </Route>

      <Route exact path={`${path}/create`}>
        <DocumentTitle title="Create Campaign" />
        <BodyLayout>
          <Form />
        </BodyLayout>
      </Route>

      <Route exact path={`${path}/:campaignId`}>
        <DocumentTitle title="Campaign details" />
        <BodyLayout>
          <Details />
        </BodyLayout>
      </Route>

      <Route exact path={path}>
        <DocumentTitle title="All Campaign" />
        <BodyLayout>
          <Campaigns />
        </BodyLayout>
      </Route>
    </Switch>
  );
}
