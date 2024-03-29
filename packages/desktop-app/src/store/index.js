import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import createReducer from './reducers';
import ipcMiddleware from './middleware/ipc';
import lessonsMiddleware from './middleware/lessons';
import settingsMiddleware from './middleware/settings';
import appMiddleware from './middleware/app';

export const history = createHistory();

const makeStore = () => {
  const reducer = createReducer();

  const store = createStore(
    reducer,
    compose(
      applyMiddleware(
        appMiddleware,
        routerMiddleware(history),
        ipcMiddleware,
        lessonsMiddleware,
        settingsMiddleware,
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
