import jwtDecode from 'jwt-decode';

import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

// import { push } from 'react-router-redux';

export const c = {
  USER_DATA_AUTH_SUCCESS: 'USER-DATA-AUTH-SUCCESS',
  USER_DATA_FETCH_SUCCESS: 'USER-DATA-FETCH-SUCCESS',
  USER_DATA_EXERCISE_NAME_ADD: 'USER-DATA-EXERCISE-NAME-ADD'
};

const userDataActions = {
  userAuthSuccess: (authToken, id) => {
    return {
      type: c.USER_DATA_AUTH_SUCCESS,
      authToken: authToken,
      id: id
    };
  },
  userDataFetchSuccess: (exerciseNames, name, email) => {
    return {
      type: c.USER_DATA_FETCH_SUCCESS,
      exerciseNames: exerciseNames,
      name: name,
      email: email
    }
  },
  fetchUserDataThunk: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(userDataActions.userDataFetchSuccess(ewoloConstants.exerciseNames));
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
          dispatch(userDataActions.userDataFetchSuccess(allExercises, body.name, body.email));
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
  }
};

export default userDataActions;
