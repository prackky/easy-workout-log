import moment from 'moment';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG-WORKOUT':
      const today = moment().format('YYYY-MM-DD');

      return {
        ...state,
        logWorkout: {
          type: 'weight',
          notes: '',
          date: today,
          exercises: []
        }
      };

    case 'LOG-WORKOUT-EXERCISE':
      {
        const logWorkout = state.logWorkout;
        const exercises = logWorkout.exercises;

        return {
          ...state,
          logWorkout: {
            ...logWorkout,
            exercises: [
            ...exercises, {
                name: 'squats',
                reps: '8',
                weight: '100',
                sets: '3'
            }
          ]
          }
        };
      }
    case 'LOG-WORKOUT-EXERCISE-DELETE':
      {
        const logWorkout = state.logWorkout;
        const exercises = logWorkout.exercises;
        const exerciseIndex = action.index;

        return {
          ...state,
          logWorkout: {
            ...logWorkout,
            exercises: [
            ...exercises.slice(0, exerciseIndex),
            ...exercises.slice(exerciseIndex + 1)
          ]
          }
        };
      }
    case 'LOG-WORKOUT-EXERCISE-SET-DATA':
      {
        const logWorkout = state.logWorkout;
        const exercises = logWorkout.exercises;
        const exerciseIndex = action.exerciseIndex;
        const exercise = exercises[exerciseIndex];
        const nameFormHint = action.exercise.name ? '' : 'Required.';
        const repsFormHint = action.exercise.reps ? '' : 'Required.';

        /*
        // this is taken care of by type="number"
        ['reps', 'sets', 'weights'].forEach((property) => {
          if (action.exercise[property]) {
            const propertyIntValue = parseInt(action.exercise[property]);
            if (!propertyIntValue) {
              
            }
          }
        });
        */

        return {
          ...state,
          logWorkout: {
            ...logWorkout,
            exercises: [
            ...exercises.slice(0, exerciseIndex),
              {
                ...exercise,
                ...action.exercise,
                nameFormHint: nameFormHint,
                repsFormHint: repsFormHint
            },
            ...exercises.slice(exerciseIndex + 1)
          ]
          }
        };
      }
    case 'LOG-WORKOUT-SET-DATA':
      {
        const logWorkout = state.logWorkout;
        const date = action.date;
        const notes = action.notes;
        const dateFormHint = action.date ? '' : 'Required or invalid'

        return {
          ...state,
          logWorkout: {
            ...logWorkout,
            notes: notes,
            date: date,
            dateFormHint: dateFormHint
          }
        };
      }

    default:
      return state;
  }
};

export default userReducer;
