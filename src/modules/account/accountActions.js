import { push } from 'react-router-redux';

import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

export const c = Object.freeze({
  ACCOUNT_SET_PASSWORD_DATA: 'ACCOUNT-SET-PASSWORD-DATA',
  ACCOUNT_PASSWORD_UPDATE_SUCCESS: 'ACCOUNT-PASSWORD-UPDATE-SUCCESS',
  ACCOUNT_SET_DATA: 'ACCOUNT-SET-DATA',
  ACCOUNT_DATA_UPDATE_SUCCESS: 'ACCOUNT-DATA-UPDATE-SUCCESS'
});


const accountActions = {
  accountSetPasswordData: (oldPassword, password) => {
    return {
      type: c.ACCOUNT_SET_PASSWORD_DATA,
      oldPassword,
      password
    };
  },
  accountPasswordUpdateSuccess: () => {
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
  },
  accountSetData: ({name, units}) => {
    return {
      type: c.ACCOUNT_SET_DATA,
      name,
      units
    };
  },
  accountDataUpdateSuccess: () => {
    return {
      type: c.ACCOUNT_DATA_UPDATE_SUCCESS
    };
  },
  accountDataUpdateThunk: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(push('/'));
          });
      }

      const userId = getState().user.data.id;
      const { name, units } = getState().account;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/users/' + userId,
        method: 'PUT',
        body: {name, units},
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(() => {
          dispatch(accountActions.accountDataUpdateSuccess());
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Updated account settings', true));
        })
        .catch(error => {
          handleError(error);
          
          dispatch(globalActions.userNotificationAdd('ERROR', `An error occured when updating account`));
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    }
  },
  accountDataFetchThunk: (displaySuccessNotification) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(push('/'));
          });
      }

      const userId = getState().user.data.id;
      
      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/users/' + userId,
        method: 'GET',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(accountActions.accountSetData({name: body.name, units: body.units}));
          if (displaySuccessNotification) {
            dispatch(globalActions.userNotificationAdd('SUCCESS', 'Successfully got account data', true));
          }
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', `An error occured when getting account information`));
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    }
  }
};

export default accountActions;
