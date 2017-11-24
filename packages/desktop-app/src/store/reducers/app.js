export const actionTypes = {
  APP_READY: 'APP_READY',
};

const initialState = {
  ready: false,
};

export default (state = initialState, action) => {
  if (action.type === actionTypes.APP_READY) {
    return {
      ...state,
      ready: true,
    };
  }
  return state;
};
