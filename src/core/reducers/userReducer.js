import {combineReducers} from 'redux';

import logWorkoutReducer from './logWorkoutReducer';

const userReducer = combineReducers({
  logWorkout: logWorkoutReducer
});

export default userReducer;
