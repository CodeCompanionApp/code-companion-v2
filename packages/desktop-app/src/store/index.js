import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import createReducer from './reducers';
import ipcMiddleware from './middleware/ipc';

export const history = createHistory();

const makeStore = () => {
  const reducer = createReducer();

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        routerMiddleware(history),
        ipcMiddleware,
      ),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const createNextReducer = require('./reducers').default; // eslint-disable-line
      const nextReducer = createNextReducer();
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};

export default makeStore;
