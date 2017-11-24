import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import userReducer from './user';
import settingsReducer from './settings';
import lessonsReducer from './lessons';
import appReducer from './app';

const createReducer = () => combineReducers({
  user: userReducer,
  router: routerReducer,
  settings: settingsReducer,
  lessons: lessonsReducer,
  app: appReducer,
});

export default createReducer;
