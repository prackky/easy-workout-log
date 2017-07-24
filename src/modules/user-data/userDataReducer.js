import { c } from './userDataActions';

import { dedup } from '../../services/exerciseNamesService';

export const initialState = {
  authToken: undefined,
  id: undefined,
  exerciseNames: [],
  name: '',
  units: 1,
  sex: 1
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
    case c.USER_DATA_SET:
      {
        const { exerciseNames, name, email, units, sex } = action;
        return {
          ...state,
          exerciseNames: [
            ...exerciseNames
          ],
          name,
          email,
          units: parseInt(units, 10),
          sex: parseInt(sex, 10)
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
