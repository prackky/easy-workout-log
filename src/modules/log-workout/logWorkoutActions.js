import { push } from 'react-router-redux';

import ewoloConstants from '../../common/ewoloConstants';
import { RequestError, handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';
import signupActions from '../signup/signupActions';

export const c = {
  LOG_WORKOUT_LOAD_EXERCISES_SUCCESS: 'LOG-WORKOUT-LOAD-EXERCISES-SUCCESS',
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
  logWorkoutLoadExercisesSuccess: (allExercises) => {
    return {
      type: c.LOG_WORKOUT_LOAD_EXERCISES_SUCCESS,
      allExercises: allExercises
    };
  },
  logWorkout: (shouldLogWorkoutExercise) => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        return Promise.resolve()
          .then(() => {
            dispatchLogWorkoutSuccess(dispatch, ewoloConstants.allExercises, shouldLogWorkoutExercise);
          });
      }

      dispatch(globalActions.taskStart());

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done');
        }, 1000);
      });

      return promise.then(result => {
          dispatchLogWorkoutSuccess(dispatch, [], shouldLogWorkoutExercise);
        })
        .catch(error => {
          handleError(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when loading exercise data'));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    };
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
  logWorkoutSaveSuccess: () => {
    return {
      type: c.LOG_WORKOUT_SAVE_SUCCESS
    };
  },
  logWorkoutSave: () => {
    return (dispatch, getState) => {
      const authToken = getState().user.data.authToken;

      if (!authToken) {
        console.log('no auth token found!');
        return Promise.resolve()
          .then(() => {
            const action = logWorkoutActions.logWorkoutSave();
            dispatch(signupActions.signupSetAfterSuccess(action));
            dispatch(push('/signup'));
          });
      }

      const logWorkoutDate = getState().user.logWorkout.date;

      dispatch(globalActions.taskStart());

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done');
        }, 1000);
      });

      return promise.then(result => {
          dispatch(logWorkoutActions.logWorkoutSaveSuccess());
          dispatch(globalActions.userNotificationAdd('SUCCESS', 'Saved workout for ' + logWorkoutDate));
          dispatch(push('/dashboard'));
        })
        .catch(error => {
          console.log(error);
          dispatch(globalActions.userNotificationAdd('ERROR', 'An error occured when saving workout for ' + logWorkoutDate));
        })
        .then(() => {
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

const dispatchLogWorkoutSuccess = (dispatch, allExercises, shouldLogWorkoutExercise) => {
  dispatch(logWorkoutActions.logWorkoutLoadExercisesSuccess(allExercises));
  if (shouldLogWorkoutExercise) {
    dispatch(logWorkoutActions.logWorkoutExercise());
  }
};

export default logWorkoutActions;
