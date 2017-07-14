import { push } from 'react-router-redux';

import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

export const c = Object.freeze({
  ACCOUNT_SET_PASSWORD_DATA: 'ACCOUNT-SET-PASSWORD-DATA',
  ACCOUNT_PASSWORD_UPDATE_SUCCESS: 'ACCOUNT-PASSWORD-UPDATE-SUCCESS'
});


const accountActions = {
  accountSetPasswordData: (oldPassword, password) => {
    return {
      type: c.ACCOUNT_SET_PASSWORD_DATA,
      oldPassword,
      password
    };
  },
  accountPasswordUpdateSuccess: (action) => {
    return {
      type: c.ACCOUNT_PASSWORD_UPDATE_SUCCESS
    };
  },
  accountPasswordUpdateThunk: () => {
    return (dispatch, getState) => {
      
      dispatch(globalActions.taskStart());

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });

      return promise
        .then(() => {
          dispatch(accountActions.accountPasswordUpdateSuccess());
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Updated password', true));
        })
        .catch(error => {
          handleError(error);
          
          dispatch(globalActions.userNotificationAdd('ERROR', `An error occured when updating password`));
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });

      /*
      const promise = ewoloUtil.getApiRequest({
        route: '/users',
        method: 'POST',
        body: { name: signup.name, email: signup.email, password: signup.password }
      });
      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {

          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Updated account information'));
          
          // dispatch(push(afterSuccess.redirect));
        })
        .catch(error => {
          handleError(error);
          
          dispatch(globalActions.userNotificationAdd('ERROR', `An error occured when updating account information`));
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
      */
    };
  }
};

export default accountActions;
