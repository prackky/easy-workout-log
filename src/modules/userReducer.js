import {combineReducers} from 'redux';

import logWorkoutReducer from './log-workout/logWorkoutReducer';
import userDataReducer from './user-data/userDataReducer';

const userReducer = combineReducers({
  logWorkout: logWorkoutReducer,
  data: userDataReducer
});

export default userReducer;
