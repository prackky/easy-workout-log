import {combineReducers} from 'redux';

import logWorkoutReducer from './logWorkoutReducer';
import userDataReducer from './userDataReducer';

const userReducer = combineReducers({
  logWorkout: logWorkoutReducer,
  data: userDataReducer
});

export default userReducer;
