export const actionTypes = {
  LESSONS_LOADED: 'LESSONS_LOADED',
};

const initialState = {
  byId: {},
  loading: true,
};

const keyById = (items) => {
  const result = items.reduce((map, obj) => {
    map[obj.id] = obj;
    return map;
  }, {});
  return result;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LESSONS_LOADED:
      return { ...state, byId: keyById(action.payload.lessons), loading: false };
    default:
      return state;
  }
};
