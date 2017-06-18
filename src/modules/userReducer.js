import {combineReducers} from 'redux';

import logWorkoutReducer from './log-workout/logWorkoutReducer';
import userDataReducer from './user-data/userDataReducer';
import userWorkoutsReducer from './user-workouts/userWorkoutsReducer';

const userReducer = combineReducers({
  logWorkout: logWorkoutReducer,
  data: userDataReducer,
  workouts: userWorkoutsReducer
});

export default userReducer;
