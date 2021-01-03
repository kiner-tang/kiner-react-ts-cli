import React from 'react';
import { Router, Route } from 'react-router';
import { RouterItem, routes } from './routeConfig';
import history from './history';


function AppRoute() {
  return (
    <Router history={history}>
      {
                routes.map((routeItem: RouterItem) => <Route key={routeItem.name} exact={routeItem.extra} path={routeItem.path} component={routeItem.component} />)
            }
    </Router>
  );
}

export default AppRoute;
