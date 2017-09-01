export const actionTypes = {
  LESSONS_LOADED: 'LESSONS_LOADED',
};

const initialState = {
  lessons: [{ name: 'Welcome to Code Companion', id: '0' }],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LESSONS_LOADED:
      return { ...state, lessons: action.payload.lessons, loading: false };
    default:
      return state;
  }
};
