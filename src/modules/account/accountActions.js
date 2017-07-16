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
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(push('/'));
          });
      }

      const { oldPassword, password } = getState().account;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/credentials',
        method: 'POST',
        body: { oldPassword, password },
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
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
    };
  }
};

export default accountActions;
