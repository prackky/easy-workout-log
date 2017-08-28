import { push } from '../../react-router-redux/index';

import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import userDataActions, { fetchUserDataThunkPromise } from '../user-data/userDataActions';

export const c = Object.freeze({
  LOGIN_SET_DATA: 'LOGIN-SET-DATA',
  LOGIN_SET_AFTER_SUCCESS: 'LOGIN-SET-AFTER-SUCCESS'
});

const loginActions = {
  loginSetData: (email, password, text) => {
    return {
      type: c.LOGIN_SET_DATA,
      email: email,
      password: password,
      text: text
    };
  },
  loginSetAfterSuccess: (action, redirect = '/') => {
    return {
      type: c.LOGIN_SET_AFTER_SUCCESS,
      action: action,
      redirect: redirect
    };
  },
  loginThunk: () => {
    return (dispatch, getState) => {
      const login = {
        ...getState().login
      };
      const afterSuccess = {
        ...login.afterSuccess // not sure about how comfortable I am with setting async future actions here
      };

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/authenticate',
        method: 'POST',
        body: { email: login.email, password: login.password }
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {

          dispatch(userDataActions.processUserAuthSuccess(body.token));

          return fetchUserDataThunkPromise(ewoloUtil, ewoloConstants, dispatch, userDataActions, handleError, body.token);
        })
        .then(() => {

          if (afterSuccess.action) {
            dispatch(afterSuccess.action);
          } else {
            if (afterSuccess.redirect) {
              dispatch(push(afterSuccess.redirect));
            }
          }
        })
        .catch(error => {
          // handleError({error, dispatch, notificationMessage: 'Invalid username / password'});
          dispatch(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Invalid username / password' })); // TODO: consider other errors here
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

export default loginActions;
