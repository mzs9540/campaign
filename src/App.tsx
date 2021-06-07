import { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './sass/main.scss';

import { PrivateRoute } from './PrivateRoute';
import { initialize } from './initial-data';

import { Router as CampaignRouter } from 'modules/Campaigns';
import { Router as HomeRouter } from 'modules/Home';
import { Router as AuthenticationRouter } from 'modules/Authentication';

class App extends PureComponent {
  componentDidMount() {
    // To initialize local storage with some data.
    initialize();
  }

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
