import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

// import { push } from 'react-router-redux';

export const c = {
  USER_WORKOUTS_FETCH_SUCCESS: 'USER-WORKOUTS-FETCH-SUCCESS'
};

const userWorkoutsActions = {
  userWorkoutsFetchSuccess: (workouts) => {
    return {
      type: c.USER_WORKOUTS_FETCH_SUCCESS,
      workouts: workouts
    };
  },
  fetchUserWorkouts: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;
      const userId = getState().user.data.id;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest('/users/' + userId + '/workouts', 'GET', null, authToken);

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(userWorkoutsActions.userWorkoutsFetchSuccess(body));
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when loading user workouts'));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    }
  }
};

export default userWorkoutsActions;