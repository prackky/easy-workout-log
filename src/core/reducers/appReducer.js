import {combineReducers} from 'redux';

import rootReducer from './rootReducer';
import userReducer from './userReducer';

const appReducer = combineReducers({
  user: userReducer
});

export default appReducer;
