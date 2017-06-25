import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

// import { push } from 'react-router-redux';

export const c = {
  USER_WORKOUTS_FETCH_SUCCESS: 'USER-WORKOUTS-FETCH-SUCCESS',
  USER_WORKOUTS_DELETE_SUCCESS: 'USER-WORKOUTS-DELETE-SUCCESS',
  USER_WORKOUTS_SET_VIEW_DETAILS: 'USER-WORKOUTS-SET-VIEW-DETAILS'
};

const userWorkoutsActions = {
  userWorkoutsFetchSuccess: (workouts) => {
    return {
      type: c.USER_WORKOUTS_FETCH_SUCCESS,
      workouts: workouts
    };
  },
  fetchUserWorkoutsThunk: () => {
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
  },
  userWorkoutsDeleteSuccess: (workoutId) => {
    return {
      type: c.USER_WORKOUTS_DELETE_SUCCESS,
      workoutId: workoutId
    }
  },
  userWorkoutsSetViewDetails: (workoutId, show) => {
    return {
      type: c.USER_WORKOUTS_SET_VIEW_DETAILS,
      workoutId: workoutId,
      show: show
    };
  }
};

export default userWorkoutsActions;
