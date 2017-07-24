import moment from 'moment';
import * as entityService from '../../services/entityService';
import * as workoutsService from '../../services/workoutsService';

import { c } from './userWorkoutsActions';

export const initialState = {
  workouts: {},
  workoutsViewDetails: {},
  workoutsAnalysis: [],
  lastWorkoutDate: moment().format('YYYY-MM-DD')
};

const userWorkoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.USER_WORKOUTS_FETCH_SUCCESS:
      {
        const { workouts } = action;

        const normalized = entityService.normalize(workouts);
        const merged = {
          ...state.workouts,
          ...normalized
        };
        const lastWorkoutDate = workoutsService.getLastDate(merged);

        return {
          ...state,
          lastWorkoutDate,
          workouts: merged
        };
      }
    case c.USER_WORKOUTS_ANALYSIS_FETCH_SUCCESS:
      {
        const { workoutsAnalysis } = action;

        return {
          ...state,
          workoutsAnalysis: workoutsAnalysis
        };
      }
    case c.USER_WORKOUTS_DELETE_SUCCESS:
      {
        const { workoutId } = action;

        const workouts = {
          ...state.workouts
        }

        delete workouts[workoutId + ''];

        return {
          ...state,
          workouts: workouts
        }
      }
    case c.USER_WORKOUTS_SET_VIEW_DETAILS:
      {
        const { workoutId, show } = action;
        const workoutsViewDetails = {
          ...state.workoutsViewDetails
        }
        workoutsViewDetails[workoutId] = show;

        return {
          ...state,
          workoutsViewDetails: workoutsViewDetails
        };
      }
    default:
      return state;
  }
};

export default userWorkoutsReducer;
