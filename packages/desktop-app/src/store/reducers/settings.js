import { actionTypes as lessonsActionTypes } from './lessons';

export const actionTypes = {
  APP_PATHS_LOADED: 'APP_PATHS_LOADED',
  APP_SETTINGS_LOADED: 'APP_SETTINGS_LOADED',
  SETTINGS_SET_WORKSPACE_PATH: 'SETTINGS_SET_WORKSPACE_PATH',
  SAVE_SETTINGS: 'SAVE_SETTINGS',
};

const initialState = {
  loading: true,
  appData: null,
  defaultWorkspacePath: undefined,
  settings: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_PATHS_LOADED:
      return {
        ...state,
        appData: action.payload.appData,
        defaultWorkspacePath: action.payload.defaultWorkspacePath,
        loading: false,
      };
    case actionTypes.APP_SETTINGS_LOADED:
      return {
        ...state,
        settings: action.payload.settings,
      };
    case actionTypes.SETTINGS_SET_WORKSPACE_PATH:
      return {
        ...state,
        settings: {
          ...state.settings,
          workspacePath: action.workspacePath,
        },
      };
    case lessonsActionTypes.LESSON_CREATE_WORKSPACE_COMPLETE: {
      const { lessonId, workspaceName } = action;
      const settings = { ...state.settings };
      settings.workspaces = settings.workspaces || {};
      const currentLessonWorkspaces = settings.workspaces[lessonId] || [];
      settings.workspaces[lessonId] = [...currentLessonWorkspaces, workspaceName];
      return {
        ...state,
        settings,
      };
    }
    default:
      return state;
  }
};
