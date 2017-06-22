import { c } from './userDataActions';

export const initialState = {
  authToken: undefined,
  id: undefined,
  exerciseNames: []
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
        const { exerciseNames } = action;
        return {
          ...state,
          exerciseNames: [
            ...exerciseNames
          ]
        };
      }
    default:
      return state;
  }
};

export default userDataReducer;
