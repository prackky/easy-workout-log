import { c } from './userDataActions';

export const initialState = {
  authToken: undefined,
  id: undefined,
  allExercises: []
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.USER_DATA_AUTH_SUCCESS:
      {
        const { authToken, id } = action;

        return {
          ...state,
          authToken: authToken,
          id: id
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
