import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from '../containers/App/';
import Main from 'Components/Main/';

export default function configureRoutes(history) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Main} />
      </Route>
    </Router>
  );
}
