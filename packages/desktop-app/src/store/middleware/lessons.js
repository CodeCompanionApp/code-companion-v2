import path from 'path';
import globby from 'globby';
import { actionTypes } from '../reducers/settings';

export default ({ getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.APP_PATHS_LOADED: {
      const { settings: { appData } } = getState();
      const searchPath = path.join(appData, 'lessons', '*/');
      console.log('Going to search', searchPath);
      globby(searchPath).then(result => console.log(result));
      break;
    }
    default:
      break;
  }
};
