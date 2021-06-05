import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { connect } from 'react-redux';

import { Home } from './Home';
import { Guest } from './Guest';

import { DocumentTitle, Show } from 'shared';
import { BodyLayout } from 'layouts';

function Router(props: {
  isAuthenticated: boolean,
}) {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={`${path}`}>
        <DocumentTitle title="Dashboard" />
        <Show when={!props.isAuthenticated}>
          <Guest />
        </Show>

        <Show when={props.isAuthenticated}>
          <BodyLayout>
            <Home />
          </BodyLayout>
        </Show>
      </Route>
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authentication.isAuthenticated,
});

const RouterWithState = connect(mapStateToProps)(Router);

export { RouterWithState as Router };
