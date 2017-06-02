import { push } from 'react-router-redux';

import globalActions from './globalActions';

const logWorkoutActions = {
  logWorkout: () => {
    return {
      type: 'LOG-WORKOUT'
    };
  },
  logWorkoutExercise: () => {
    return {
      type: 'LOG-WORKOUT-EXERCISE'
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
  logWorkoutSetData: (date, notes) => {
    return {
      type: 'LOG-WORKOUT-SET-DATA',
      date: date,
      notes: notes
    };
  },
  logWorkoutSaveSuccess: () => {
    return {
      type: 'LOG-WORKOUT-SAVE-SUCCESS'
    };
  },
  logWorkoutSave: () => {
    return (dispatch, getState) => {
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
          dispatch(push('/'));
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
