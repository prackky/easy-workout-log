import { push } from 'react-router-redux';

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
      const signup = getState().signup;
      const email = signup.email;
      const afterSuccess = signup.afterSuccess;

      dispatch(globalActions.taskStart());

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done');
        }, 1000);
      });

      return promise.then(result => {
          dispatch(userDataActions.userAuthSuccess('blah'));
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Created account for ' + email));

          if (afterSuccess.action) {
            dispatch(afterSuccess.action);
          }

          if (!afterSuccess.action && afterSuccess.redirect) {
            dispatch(push(afterSuccess.redirect));
          }
        })
        .catch(error => {
          console.log(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when creating account for ' + email));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

export default signupActions;
