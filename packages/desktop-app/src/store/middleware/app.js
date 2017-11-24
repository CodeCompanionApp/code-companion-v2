import { actionTypes as settingsActionTypes } from '../reducers/settings';
import { actionTypes as lessonsActionTypes } from '../reducers/lessons';
import { actionTypes } from '../reducers/app';

const queuedActions = [];
const whitelistedActions = [
  settingsActionTypes.APP_PATHS_LOADED,
  settingsActionTypes.APP_SETTINGS_LOADED,
  lessonsActionTypes.LESSONS_LOADED,
  settingsActionTypes.EXISTING_WORKSPACES_UPDATED,
  actionTypes.APP_READY,
];

export default ({ getState }) => next => (action) => {
  const { app: { ready: appReady } } = getState();
  if (appReady || whitelistedActions.includes(action.type)) {
    next(action);
    if (action.type === actionTypes.APP_READY) {
      console.log('Releasing queue', queuedActions);
      queuedActions.forEach(a => next(a));
    }
  } else {
    console.log('Skipping and queueing action', action);
    queuedActions.push(action);
  }
};
