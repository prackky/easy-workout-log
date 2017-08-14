// import moment from 'moment';
// import * as entityService from '../../services/entityService';
// import * as workoutsService from '../../services/workoutsService';

import { c } from './analyticsActions';

export const initialState = {
  exercise: {}
};

const analyticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.ANALYTICS_EXERCISE_SET_DATA:
      {
        const { exerciseName, data } = action;

        const newExercise = {
          ...state.exercise
        };

        newExercise[exerciseName] = data; // need to use bracket notation here.

        // TODO: Also consider hashing the exercise name: http://www.erlycoder.com/49/javascript-hash-functions-to-convert-string-into-integer-hash-

        return {
          ...state,
          exercise: newExercise
        };
      }
    default:
      return state;
  }
};

export default analyticsReducer;
