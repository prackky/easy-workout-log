// import { push } from '../../react-router-redux/index';

import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
// import userDataActions from '../user-data/userDataActions';

export const c = Object.freeze({
  ANALYTICS_EXERCISE_SET_DATA: 'ANALYTICS-EXERCISE-SET-DATA',
  ANALYTICS_EXERCISE_SET_SELECTED_EXERCISE_NAME: 'ANALYTICS-EXERCISE-SET-SELECTED-EXERCISE-NAME'
});


const analyticsActions = {
  analyticsExerciseSetSelectedExerciseName: (exerciseName) => {
    return {
      type: c.ANALYTICS_EXERCISE_SET_SELECTED_EXERCISE_NAME,
      exerciseName
    };
  },
  analyticsExerciseSetData: (exerciseName, data) => {
    return {
      type: c.ANALYTICS_EXERCISE_SET_DATA,
      exerciseName,
      data
    };
  },
  analyticsExerciseFetchDataThunk: (exerciseName, dateBefore, dateAfter) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;
      const userId = getState().user.data.id;
      const units = getState().user.data.units;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatch(globalActions.userNotificationAdd('ERROR', 'Cannot fetch analytics data because user is not logged in.'));
          });
      }

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: `/users/${userId}/analysis/exercise?units=${units}&exerciseName=${exerciseName}` +
          (dateBefore ? '&dateBefore=' + dateBefore : '') +
          (dateAfter ? '&dateAfter=' + dateAfter : ''),
        method: 'GET',
        authToken: authToken
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(analyticsActions.analyticsExerciseSetData(exerciseName, body));
        })
        .catch(error => {
          handleError({ error, dispatch, notificationMessage: `An error occured when fetching exercise analytics data` });
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    };
  }

};

export default analyticsActions;
