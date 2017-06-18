import { c } from './userWorkoutsActions';

export const initialState = {
  workouts: []
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
    default:
      return state;
  }
};

export default userWorkoutsReducer;
