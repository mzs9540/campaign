import { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './sass/main.scss';

import { PrivateRoute } from './PrivateRoute';

import { Router as CampaignRouter } from 'modules/Campaigns';
import { Router as HomeRouter } from 'modules/Home';
import { Router as AuthenticationRouter } from 'modules/Authentication';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/auth" component={AuthenticationRouter} />

          <PrivateRoute path="/campaigns" component={CampaignRouter} />

          <Route path="/" component={HomeRouter} />
        </Switch>
      </Router>
    );
  }
}

export { App };
