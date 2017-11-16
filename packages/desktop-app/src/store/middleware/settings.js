import { actionTypes } from '../reducers/settings';
import { actionTypes as lessonsActionTypes } from '../reducers/lessons';

const saveSettingsTriggers = [
  actionTypes.SETTINGS_SET_WORKSPACE_PATH,
  lessonsActionTypes.LESSON_CREATE_WORKSPACE_COMPLETE,
];

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  if (saveSettingsTriggers.includes(action.type)) {
    const { settings: { settings } } = getState();
    dispatch({
      type: actionTypes.SAVE_SETTINGS,
      settings,
    });
  }
};
