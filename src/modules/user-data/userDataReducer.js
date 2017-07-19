import { c } from './userDataActions';

import { dedup } from '../../services/exerciseNamesService';

export const initialState = {
  authToken: undefined,
  id: undefined,
  exerciseNames: [],
  name: undefined,
  units: 1
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
        const { exerciseNames, name, email, units } = action;
        return {
          ...state,
          exerciseNames: [
            ...exerciseNames
          ],
          name,
          email,
          units: parseInt(units, 10)
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
