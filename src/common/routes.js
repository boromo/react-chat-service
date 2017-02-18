import { Route, IndexRoute } from 'react-router';
import React from 'react';

import App from './containers/App';
import WelcomePage from './components/WelcomePage';
import AdminPage from './components/AdminPage';
import ActiveUsers from './components/ActiveUsers';

const Routes = (
  <Route path="/" component={App}>
    <IndexRoute component={WelcomePage} />
    <Route path="/welcome" component={WelcomePage} />
    <Route path="/admin" component={AdminPage} />
    <Route path="/active-users" component={ActiveUsers} />
  </Route>
);

export default Routes;
