import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from '../common/store/configureStore';
import DevTools from '../common/containers/DevTools';
import routes from '../common/routes';
import '../common/less/main.less';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('react');

ReactDOM.render(
  <Provider store={store}>
    <div style={{ height: '100%' }}>
      <Router history={browserHistory} >
        {routes}
      </Router>
      {process.env.NODE_ENV !== 'production' && <DevTools />}
    </div>
  </Provider>,
  rootElement
);
