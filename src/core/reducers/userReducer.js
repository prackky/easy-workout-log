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
                exercise: 'squats',
                reps: 8,
                weight: 100,
                sets: 3
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
