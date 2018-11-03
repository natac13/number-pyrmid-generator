// Immutable dev tools makes for easier viewing of Maps and Lists in the
// Chrome Developer tools.
import Immutable from 'immutable';
import installDevTools from 'immutable-devtools';
installDevTools(Immutable);

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import App from './containers/App/';
import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { Map } from 'immutable';
import { syncHistoryWithStore } from 'react-router-redux';

import configureRoutes from './routes/configureRoutes.js';
/** Global styles */
import './stylesheets/setup.scss';
import './stylesheets/normalize.css';


import configureStore from './store/configureStore';
// seed store with an Immutable.Iterable as per redux-immutable
const store = configureStore(Map());

/** Custom select function since the state is using redux-immutable #2 requirement */
const syncOptions = {
  selectLocationState: (state) => state.get('routing').toJS(),
};
const history = syncHistoryWithStore(browserHistory, store, syncOptions);

const rootElement = document.getElementById('root');

render((
  <Provider store={store}>
    {configureRoutes(history)}
  </Provider>
), rootElement);
