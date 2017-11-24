export const actionTypes = {
  LESSONS_LOADED: 'LESSONS_LOADED',
  LESSON_CREATE_WORKSPACE: 'LESSON_CREATE_WORKSPACE',
  LESSON_CREATE_WORKSPACE_COMPLETE: 'LESSON_CREATE_WORKSPACE_COMPLETE',
  LESSON_CREATE_WORKSPACE_FAILED: 'LESSON_CREATE_WORKSPACE_FAILED',
  LESSON_LOAD: 'LESSON_LOAD',
  LESSON_LOAD_COMPLETE: 'LESSON_LOAD_COMPLETE',
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
    case actionTypes.LESSON_LOAD: {
      const { lessonId } = action;
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.lessonId]: { ...state.byId[lessonId], loading: true },
        },
      };
    }
    case actionTypes.LESSON_LOAD_COMPLETE: {
      const { lessonId, lessonData } = action;
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.lessonId]: {
            ...state.byId[lessonId],
            loading: false,
            loaded: true,
            data: lessonData,
          },
        },
      };
    }
    default:
      return state;
  }
};
