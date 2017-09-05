export const actionTypes = {
  APP_PATHS_LOADED: 'APP_PATHS_LOADED',
};

const initialState = {
  loading: true,
  appData: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_PATHS_LOADED:
      return {
        ...state,
        appData: action.payload.appData,
        preloadScript: action.payload.preloadScript,
        loading: false,
      };
    default:
      return state;
  }
};
