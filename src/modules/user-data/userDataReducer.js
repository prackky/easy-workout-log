import { c } from './userDataActions';

export const initialState = {
  authToken: undefined,
  allExercises: []
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.USER_DATA_AUTH_SUCCESS:
      {
        const { authToken } = action;

        return {
          ...state,
          authToken: authToken
        };
      }
    case c.USER_DATA_FETCH_SUCCESS:
      {
        const { allExercises } = action;
        return {
          ...state,
          allExercises: [
            ...allExercises
          ]
        };
      }
    default:
      return state;
  }
};

export default userDataReducer;
