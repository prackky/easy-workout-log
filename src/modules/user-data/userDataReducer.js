import { c } from './userDataActions';

import { dedup } from '../../services/exerciseNamesService';

export const initialState = {
  authToken: undefined,
  id: undefined,
  exerciseNames: [],
  userExerciseNames: [],
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
        let { exerciseNames, userExerciseNames, name, email, units, sex } = action;

        if (!units) {
          units = 1;
        }

        if (!sex) {
          sex = 1;
        }

        return {
          ...state,
          exerciseNames: [
            ...exerciseNames
          ],
          userExerciseNames: [
            ...userExerciseNames
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
