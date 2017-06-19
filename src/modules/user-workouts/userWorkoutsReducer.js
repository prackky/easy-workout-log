import { c } from './userWorkoutsActions';

export const initialState = {
  workouts: [],
  workoutsViewDetails: {}
};

const userWorkoutsReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.USER_WORKOUTS_FETCH_SUCCESS:
      {
        const { workouts } = action;

        return {
          ...state,
          workouts: workouts
        };
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
