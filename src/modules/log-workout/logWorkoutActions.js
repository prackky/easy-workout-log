import { push } from 'react-router-redux';

// import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import signupActions from '../signup/signupActions';

export const c = {
  LOG_WORKOUT: 'LOG-WORKOUT',
  LOG_WORKOUT_EXERCISE: 'LOG-WORKOUT-EXERCISE',
  LOG_WORKOUT_EXERCISE_DELETE: 'LOG-WORKOUT-EXERCISE-DELETE',
  LOG_WORKOUT_EXERCISE_SET_DATA: 'LOG-WORKOUT-EXERCISE-SET-DATA',
  LOG_WORKOUT_SET_DATA: 'LOG-WORKOUT-SET-DATA',
  LOG_WORKOUT_SET_SHOW_TEMPO_HELP: 'LOG-WORKOUT-SET-SHOW-TEMPO-HELP',
  LOG_WORKOUT_SET_SHOW_REST_HELP: 'LOG-WORKOUT-SET-SHOW-REST-HELP',
  LOG_WORKOUT_SET_SHOW_WEIGHT_HELP: 'LOG-WORKOUT-SET-SHOW-WEIGHT-HELP',
  LOG_WORKOUT_SAVE_SUCCESS: 'LOG-WORKOUT-SAVE-SUCCESS'
};

const logWorkoutActions = {
  logWorkout: () => {
    return {
      type: c.LOG_WORKOUT
    }
  },
  logWorkoutExercise: (name, reps, weight, sets, tempo, rest, showAdvanced) => {
    return {
      type: c.LOG_WORKOUT_EXERCISE,
      name: name,
      reps: reps,
      weight: weight,
      sets: sets,
      tempo: tempo,
      rest: rest,
      showAdvanced
    };
  },
  logWorkoutExerciseDelete: (index) => {
    return {
      type: c.LOG_WORKOUT_EXERCISE_DELETE,
      index: index
    };
  },
  logWorkoutExerciseSetData: (index, exercise) => {
    return {
      type: c.LOG_WORKOUT_EXERCISE_SET_DATA,
      exerciseIndex: index,
      exercise: exercise
    };
  },
  logWorkoutSetData: (date, notes, showTempoHelp = false, showRestHelp = false) => {
    return {
      type: c.LOG_WORKOUT_SET_DATA,
      date: date,
      notes: notes,
      showTempoHelp: showTempoHelp,
      showRestHelp: showRestHelp
    };
  },
  logWorkoutSetShowTempoHelp: (showTempoHelp = true) => {
    return {
      type: c.LOG_WORKOUT_SET_SHOW_TEMPO_HELP,
      showTempoHelp: showTempoHelp
    };
  },
  logWorkoutSetShowRestHelp: (showRestHelp = true) => {
    return {
      type: c.LOG_WORKOUT_SET_SHOW_REST_HELP,
      showRestHelp: showRestHelp
    };
  },
  logWorkoutSetShowWeightHelp: (showWeightHelp = true) => {
    return {
      type: c.LOG_WORKOUT_SET_SHOW_WEIGHT_HELP,
      showWeightHelp: showWeightHelp
    };
  },
  logWorkoutSaveSuccess: (id) => {
    return {
      type: c.LOG_WORKOUT_SAVE_SUCCESS,
      id: id
    };
  },
  logWorkoutSave: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            const action = logWorkoutActions.logWorkoutSave();
            dispatch(signupActions.signupSetAfterSuccess(action));
            dispatch(push('/signup'));
          });
      }

      const logWorkout = getState().user.logWorkout;
      const logWorkoutDate = logWorkout.date;

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest('/workouts', 'POST', logWorkout, authToken);

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(logWorkoutActions.logWorkoutSaveSuccess(body.id));
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Saved workout for ' + logWorkoutDate));
          dispatch(push('/dashboard'));
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when saving workout for ' + logWorkoutDate));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

export default logWorkoutActions;
