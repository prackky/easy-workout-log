import { combineReducers } from 'redux';

import userReducer from './userReducer';
import globalReducer from './global/globalReducer';
import signupReducer from './signup/signupReducer';

const appReducer = combineReducers({ 
  user: userReducer, 
  signup: signupReducer,
  global: globalReducer 
});

export default appReducer;
