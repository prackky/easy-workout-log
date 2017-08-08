import moment from 'moment';

import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

// import { push } from '../../react-router-redux/index';

export const c = {
  USER_WORKOUTS_FETCH_SUCCESS: 'USER-WORKOUTS-FETCH-SUCCESS',
  USER_WORKOUTS_DELETE_SUCCESS: 'USER-WORKOUTS-DELETE-SUCCESS',
  USER_WORKOUTS_SET_VIEW_DETAILS: 'USER-WORKOUTS-SET-VIEW-DETAILS',
  USER_WORKOUTS_ANALYSIS_FETCH_SUCCESS: 'USER-WORKOUTS-ANALYSIS-FETCH-SUCCESS'
};

const userWorkoutsActions = {
  userWorkoutsAnalysisFetchSuccess: (workoutsAnalysis) => {
    return {
      type: c.USER_WORKOUTS_ANALYSIS_FETCH_SUCCESS,
      workoutsAnalysis: workoutsAnalysis
    };
  },
  fetchUserWorkoutsAnalysisThunk: (dateBefore, dateAfter, exerciseName) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;
      const userId = getState().user.data.id;
      const units = getState().user.data.units;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(globalActions.userNotificationAdd('ERROR', 'Cannot fetch workout progress data because user is not logged in.'));
          });
      }

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: `/users/${userId}/analysis/workouts?units=${units}` +
          (dateBefore ? '&dateBefore=' + dateBefore : '') +
          (dateAfter ? '&dateAfter=' + dateAfter : '') +
          (exerciseName ? '&exerciseName=' + exerciseName : ''),
        method: 'GET',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(userWorkoutsActions.userWorkoutsAnalysisFetchSuccess(body));
        })
        .catch(error => {
          handleError({ error, dispatch, notificationMessage: 'An error occured when loading user workouts progress data.' });
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    }
  },
  userWorkoutsFetchSuccess: (workouts) => {
    return {
      type: c.USER_WORKOUTS_FETCH_SUCCESS,
      workouts: workouts
    };
  },
  fetchUserWorkoutsThunk: (dateBefore) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;
      const userId = getState().user.data.id;

      // we fetch workouts for one day before the day specified to handle any rollover error
      let queryDateBefore = null;
      if (dateBefore) {
        queryDateBefore = moment(dateBefore).subtract(1, 'days').format('YYYY-MM-DD');
      }

      const route = `/users/${userId}/workouts` + (queryDateBefore ? '?dateBefore=' + queryDateBefore : '');

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: route,
        method: 'GET',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(userWorkoutsActions.userWorkoutsFetchSuccess(body));
        })
        .catch(error => {
          handleError({ error, dispatch, notificationMessage: 'An error occured when loading user workouts' });
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    }
  },
  fetchUserWorkoutThunk: (userId, workoutId) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: `/users/${userId}/workouts/${workoutId}`,
        method: 'GET',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(userWorkoutsActions.userWorkoutsFetchSuccess([body]));
        })
        .catch(error => {
          handleError({ error, dispatch, notificationMessage: 'An error occured when loading user workout' });
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
  deleteUserWorkoutThunk: (workoutId, workoutDate) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;
      const userId = getState().user.data.id;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: `/users/${userId}/workouts/${workoutId}`,
        method: 'DELETE',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponseStatus)
        .then(status => {
          dispatch(userWorkoutsActions.userWorkoutsDeleteSuccess(workoutId));
        })
        .catch(error => {
          handleError({ error, dispatch, notificationMessage: 'An error occured when deleting a workout' });
        })
        .then(() => {
          dispatch(globalActions.userNotificationAdd('SUCCESS', `Deleted workout for ${workoutDate}`));
          dispatch(globalActions.taskEnd());
        });
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
