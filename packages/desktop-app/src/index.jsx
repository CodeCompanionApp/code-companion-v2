import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';

import App from './components/App';
import makeStore, { history } from './store';

import './main.css';

const store = makeStore();

const renderApp = (AppComponent) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <AppComponent />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default; // eslint-disable-line global-require
    renderApp(newApp);
  });
}
