export const actionTypes = {
  APP_PATHS_LOADED: 'APP_PATHS_LOADED',
  APP_SETTINGS_LOADED: 'APP_SETTINGS_LOADED',
};

const initialState = {
  loading: true,
  appData: null,
  settings: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_PATHS_LOADED:
      return {
        ...state,
        appData: action.payload.appData,
        loading: false,
      };
    case actionTypes.APP_SETTINGS_LOADED:
      return {
        ...state,
        settings: action.payload.settings,
      };
    default:
      return state;
  }
};
