import { push } from 'react-router-redux';

import ewoloUtil from '../../common/ewoloUtil';
import { RequestError, handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import userDataActions from '../user-data/userDataActions';

export const loginConstants = Object.freeze({
  LOGIN_SET_DATA: 'LOGIN-SET-DATA',
  LOGIN_SET_AFTER_SUCCESS: 'LOGIN-SET-AFTER-SUCCESS'
});

const loginActions = {
  loginSetData: (email, password) => {
    return {
      type: loginConstants.LOGIN_SET_DATA,
      email: email,
      password: password
    };
  },
  loginSetAfterSuccess: (action, redirect = '/dashboard') => {
    return {
      type: loginConstants.LOGIN_SET_AFTER_SUCCESS,
      action: action,
      redirect: redirect
    };
  },
  login: () => {
    return (dispatch, getState) => {
      const login = {
        ...getState().login
      };
      const afterSuccess = {
        ...login.afterSuccess // not sure about how comfortable I am with setting async future actions here
      };

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest('/authenticate', 'POST', { email: login.email, password: login.password });
      
      return promise.then(response => {
          if (response.status >= 400) {
            throw new RequestError(response);
          }

          dispatch(userDataActions.userAuthSuccess('blah'));

          if (afterSuccess.action) {
            dispatch(afterSuccess.action);
          } else {
            if (afterSuccess.redirect) {
              dispatch(push(afterSuccess.redirect));
            }
          }
        })
        .catch(error => {
          handleError(error);
          let userNotificationText = 'Invalid username / password';
          dispatch(globalActions.userNotificationAdd('ERROR', userNotificationText));
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

export default loginActions;
