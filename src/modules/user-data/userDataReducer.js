import { c } from './userDataActions';

import { dedup } from '../../services/exerciseNamesService';

export const initialState = {
  authToken: undefined,
  id: undefined,
  exerciseNames: [],
  name: undefined
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
        const { exerciseNames, name, email } = action;
        return {
          ...state,
          exerciseNames: [
            ...exerciseNames
          ],
          name: name,
          email: email
        };
      }
    case c.USER_DATA_EXERCISE_NAME_ADD:
      {
        const { name } = action;

        const exerciseNames = [
          name,
          ...state.exerciseNames
        ];

        return {
          ...state,
          exerciseNames: dedup(exerciseNames)
        };
      }
    default:
      return state;
  }
};

export default userDataReducer;
