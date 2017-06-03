import { combineReducers } from 'redux';

import userReducer from './userReducer';
import globalReducer from './globalReducer';
import signupReducer from './signupReducer';

const appReducer = combineReducers({ 
  user: userReducer, 
  signup: signupReducer,
  global: globalReducer 
});

export default appReducer;
