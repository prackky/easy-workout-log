import { combineReducers } from 'redux';

import userReducer from './userReducer';
import globalReducer from './global/globalReducer';
import signupReducer from './signup/signupReducer';
import loginReducer from './login/loginReducer';
import accountReducer from './account/accountReducer';

const appReducer = combineReducers({ 
  user: userReducer, 
  signup: signupReducer,
  login: loginReducer,
  global: globalReducer,
  account: accountReducer
});

export default appReducer;
