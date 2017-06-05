import { push } from 'react-router-redux';

import ewoloUtil, {RequestError} from '../ewoloUtil';

import globalActions from './globalActions';
import userDataActions from './userDataActions';

const signupActions = {
  signupSetData: (name, email, password) => {
    return {
      type: 'SIGNUP-SET-DATA',
      name: name,
      email: email,
      password: password
    };
  },
  signupAfterSuccess: (action, redirect = '/dashboard') => {
    return {
      type: 'SIGNUP-AFTER-SUCCESS',
      action: action,
      redirect: redirect
    };
  },
  signup: () => {
    return (dispatch, getState) => {
      const signup = {
        ...getState().signup
      };
      const afterSuccess = {
        ...signup.afterSuccess // not sure about how comfortable I am with setting async future actions here
      };

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest('/users', 'POST', { name: signup.name, email: signup.email, password: signup.password });

      /*
      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done');
        }, 1000);
      });
      */

      return promise.then(response => {
          if (response.status > 400) {
            throw new RequestError(response);
          }

          dispatch(userDataActions.userAuthSuccess('blah'));
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Created account for ' + signup.email));

          if (afterSuccess.action) {
            dispatch(afterSuccess.action);
          }

          if (!afterSuccess.action && afterSuccess.redirect) {
            dispatch(push(afterSuccess.redirect));
          }
        })
        .catch(error => {
          console.error(error);
          let userNotificationText = 'An error occured when creating account for ' + signup.email;

          if (error.response && error.response.status === 409) {
            userNotificationText = 'An account with this email address already exists!';
          }

          dispatch(globalActions.userNotificationAdd('ERROR', userNotificationText));
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

export default signupActions;
