import { push } from '../../react-router-redux/index';

import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import userDataActions from '../user-data/userDataActions';

export const c = Object.freeze({
  SIGNUP_SET_DATA: 'SIGNUP-SET-DATA',
  SIGNUP_SET_AFTER_SUCCESS: 'SIGNUP-SET-AFTER-SUCCESS'
});


const signupActions = {
  signupSetData: (name, email, password) => {
    return {
      type: c.SIGNUP_SET_DATA,
      name: name,
      email: email,
      password: password
    };
  },
  signupSetAfterSuccess: (action, redirect = '/dashboard') => {
    return {
      type: c.SIGNUP_SET_AFTER_SUCCESS,
      action: action,
      redirect: redirect
    };
  },
  signupThunk: () => {
    return (dispatch, getState) => {
      const signup = {
        ...getState().signup
      };
      const afterSuccess = {
        ...signup.afterSuccess // not sure about how comfortable I am with setting async future actions here
      };

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/users',
        method: 'POST',
        body: { name: signup.name, email: signup.email, password: signup.password }
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {

          dispatch(userDataActions.processUserAuthSuccess(body.token));

          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Created account for ' + signup.email));

          if (afterSuccess.action) {
            dispatch(afterSuccess.action);
          }

          if (!afterSuccess.action && afterSuccess.redirect) {
            dispatch(push(afterSuccess.redirect));
          }
        })
        .catch(error => {
          handleError(error);
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
