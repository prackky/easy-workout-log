import { combineReducers } from 'redux';

import userReducer from './userReducer';
import globalReducer from './globalReducer';

const appReducer = combineReducers({ user: userReducer, global: globalReducer });

export default appReducer;
