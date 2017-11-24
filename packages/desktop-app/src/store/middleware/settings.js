import { push } from 'react-router-redux';

import { actionTypes } from '../reducers/settings';
import { actionTypes as lessonsActionTypes } from '../reducers/lessons';
import { findExistingWorkspaces } from './lessons';

const saveSettingsTriggers = [
  actionTypes.SETTINGS_SET_WORKSPACE_PATH,
  actionTypes.EXISTING_WORKSPACES_UPDATED,
  lessonsActionTypes.LESSON_CREATE_WORKSPACE_COMPLETE,
];

async function updateExistingWorkspaces({ workspacePath, workspaces, dispatch }) {
  if (workspacePath && workspaces) {
    const folders = await findExistingWorkspaces(workspacePath, '');
    const workspacesThatExist = workspaces
      .filter(workspace => folders.includes(workspace.folder));
    dispatch({
      type: actionTypes.EXISTING_WORKSPACES_UPDATED,
      workspaces: workspacesThatExist,
    });
  }
}

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  if (action.type === actionTypes.APP_SETTINGS_LOADED ||
      action.type === actionTypes.SETTINGS_SET_WORKSPACE_PATH) {
    const { settings: { settings: { workspacePath, workspaces } } } = getState();
    updateExistingWorkspaces({ workspacePath, workspaces, dispatch });
  }
  if (action.type === actionTypes.SETTINGS_SET_WORKSPACE_PATH) {
    dispatch(push('/'));
  }
  if (saveSettingsTriggers.includes(action.type)) {
    const { settings: { settings } } = getState();
    dispatch({
      type: actionTypes.SAVE_SETTINGS,
      settings,
    });
  }
};
