import ewoloConstants from '../../common/ewoloConstants';
import { RequestError, handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

// import { push } from 'react-router-redux';

export const c = {
  USER_DATA_AUTH_SUCCESS: 'USER-DATA-AUTH-SUCCESS',
  USER_DATA_FETCH_SUCCESS: 'USER-DATA-FETCH-SUCCESS'
};

const userDataActions = {
  userAuthSuccess: (authToken) => {
    return {
      type: c.USER_DATA_AUTH_SUCCESS,
      authToken: authToken
    };
  },
  userDataFetchSuccess: (allExercises) => {
    return {
      type: c.USER_DATA_FETCH_SUCCESS,
      allExercises: allExercises
    }
  },
  fetchUserData: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(userDataActions.userDataFetchSuccess(ewoloConstants.allExercises));
          });
      }

      dispatch(globalActions.taskStart());

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done');
        }, 1000);
      });

      return promise.then(result => {
          dispatch(userDataActions.userDataFetchSuccess(ewoloConstants.allExercises));
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when loading user data'));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    };
  },
};

export default userDataActions;
