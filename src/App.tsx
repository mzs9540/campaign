import { PureComponent } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { Temp } from './Temp';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <PrivateRoute exact path="/private" component={Temp} />

          <Route exact path="/">
            Hello
          </Route>
        </Switch>
      </Router>
    );
  }
}

export { App };
