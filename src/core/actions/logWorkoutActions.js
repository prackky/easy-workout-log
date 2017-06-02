import { push } from 'react-router-redux';

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
  logWorkoutSave: () => {
    return {
      type: 'LOG-WORKOUT-SAVE'
    };
  },
  logWorkoutSaveFlow: () => {
    return (dispatch, getState) => {
      dispatch({ type: 'TASK-START' });

      const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve('done');
        }, 1000);
      });

      return promise.then(result => {
          dispatch(logWorkoutActions.logWorkoutSave());
          dispatch(push('/'));
        })
        .catch(error => {
          console.log(error);
        })
        .then(() => {
          dispatch({ type: 'TASK-END' });
        });
    };
  }
};

export default logWorkoutActions;
