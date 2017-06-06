import { push } from 'react-router-redux';

import globalActions from './globalActions';
import signupActions from './signupActions';

const logWorkoutActions = {
  logWorkout: () => {
    return {
      type: 'LOG-WORKOUT'
    };
  },
  logWorkoutExercise: (name, reps, weight, sets, tempo, rest, showAdvanced) => {
    return {
      type: 'LOG-WORKOUT-EXERCISE',
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
      type: 'LOG-WORKOUT-EXERCISE-DELETE',
      index: index
    };
  },
  logWorkoutExerciseSetData: (index, exercise) => {
    return {
      type: 'LOG-WORKOUT-EXERCISE-SET-DATA',
      exerciseIndex: index,
      exercise: exercise
    };
  },
  logWorkoutSetData: (date, notes, showTempoHelp = false, showRestHelp = false) => {
    return {
      type: 'LOG-WORKOUT-SET-DATA',
      date: date,
      notes: notes,
      showTempoHelp: showTempoHelp,
      showRestHelp: showRestHelp
    };
  },
  logWorkoutSetShowTempoHelp: (showTempoHelp = true) => {
    return {
      type: 'LOG-WORKOUT-SET-SHOW-TEMPO-HELP',
      showTempoHelp: showTempoHelp
    };
  },
  logWorkoutSetShowRestHelp: (showRestHelp = true) => {
    return {
      type: 'LOG-WORKOUT-SET-SHOW-REST-HELP',
      showRestHelp: showRestHelp
    };
  },
  logWorkoutSetShowWeightHelp: (showWeightHelp = true) => {
    return {
      type: 'LOG-WORKOUT-SET-SHOW-WEIGHT-HELP',
      showWeightHelp: showWeightHelp
    };
  },
  logWorkoutSaveSuccess: () => {
    return {
      type: 'LOG-WORKOUT-SAVE-SUCCESS'
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
            dispatch(signupActions.signupAfterSuccess(action));
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

export default logWorkoutActions;
