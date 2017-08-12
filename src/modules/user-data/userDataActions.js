import jwtDecode from 'jwt-decode';
// import { push } from '../../react-router-redux/index';

import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
// import accountActions from '../account/accountActions';

export const c = {
  USER_DATA_AUTH_SUCCESS: 'USER-DATA-AUTH-SUCCESS',
  USER_DATA_SET: 'USER-DATA-SET',
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
  userDataSet: (exerciseNames, userExerciseNames = [], name, email, units, sex) => {
    return {
      type: c.USER_DATA_SET,
      exerciseNames,
      userExerciseNames,
      name,
      email,
      units,
      sex
    };
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
      
      return fetchUserDataThunkPromise(ewoloUtil, ewoloConstants, dispatch, userDataActions, handleError, authToken)
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

export const fetchUserDataThunkPromise = (ewoloUtil, ewoloConstants, dispatch, userDataActions, handleError, authToken) => {

  const promise = ewoloUtil.getApiRequest({
    route: '/user-data',
    method: 'GET',
    authToken: authToken
  });

  return promise
    .then(ewoloUtil.getApiResponse)
    .then(body => {
      const allExercises = body.exerciseNames.concat(ewoloConstants.exerciseNames);
      dispatch(userDataActions.userDataSet(allExercises, body.exerciseNames, body.name, body.email, body.units, body.sex));
    })
    .catch(error => {
      handleError({ error, dispatch, notificationMessage: 'An error occured when loading user data' });
    });
}

export default userDataActions;
