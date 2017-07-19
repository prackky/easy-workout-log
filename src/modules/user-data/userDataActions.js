import jwtDecode from 'jwt-decode';
import { push } from 'react-router-redux';

import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import accountActions from '../account/accountActions';



export const c = {
  USER_DATA_AUTH_SUCCESS: 'USER-DATA-AUTH-SUCCESS',
  USER_DATA_SET: 'USER-DATA-SET',
  USER_DATA_EXERCISE_NAME_ADD: 'USER-DATA-EXERCISE-NAME-ADD',
  USER_DATA_UPDATE_SUCCESS: 'USER-DATA-UPDATE-SUCCESS'
};

const userDataActions = {
  userAuthSuccess: (authToken, id) => {
    return {
      type: c.USER_DATA_AUTH_SUCCESS,
      authToken: authToken,
      id: id
    };
  },
  userDataSet: (exerciseNames, name, email, units) => {
    return {
      type: c.USER_DATA_SET,
      exerciseNames: exerciseNames,
      name: name,
      email: email,
      units
    }
  },
  fetchUserDataThunk: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(userDataActions.userDataSet(ewoloConstants.exerciseNames));
          });
      }

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/user-data',
        method: 'GET',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          const allExercises = body.exerciseNames.concat(ewoloConstants.exerciseNames);
          dispatch(userDataActions.userDataSet(allExercises, body.name, body.email, body.units));
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when loading user data'));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    }
  },
  processUserAuthSuccess: (authToken) => {
    return (dispatch, getState) => {
      const decoded = jwtDecode(authToken);
      const id = decoded.id;
      ewoloUtil.storeObject(ewoloConstants.storage.authTokenKey, authToken);
      ewoloUtil.storeObject(ewoloConstants.storage.userIdKey, id);
      dispatch(userDataActions.userAuthSuccess(authToken, id));
    }
  },
  userDataExerciseNameAdd: (name) => {
    return {
      type: c.USER_DATA_EXERCISE_NAME_ADD,
      name: name
    };
  },
  userDataUpdateSuccess: () => {
    return {
      type: c.USER_DATA_UPDATE_SUCCESS
    };
  },
  userDataUpdateThunk: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(push('/'));
          });
      }

      const { id, name, units } = getState().user.data;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: '/users/' + id,
        method: 'PUT',
        body: { name, units },
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(() => {
          dispatch(userDataActions.userDataUpdateSuccess());
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

};

export default userDataActions;
