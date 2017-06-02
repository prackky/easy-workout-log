import moment from 'moment';

const logWorkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOG-WORKOUT':
      const today = moment().format('YYYY-MM-DD');

      return {
        ...state,
        componentMounted: true,
        type: 'weight',
        notes: '',
        date: today,
        exercises: []
      };

    case 'LOG-WORKOUT-EXERCISE':
      {
        const exercises = state.exercises;

        return {
          ...state,
          exercises: [
            ...exercises, {
              name: 'squats',
              reps: '8',
              weight: '100',
              sets: '1',
              tempo: '101',
              rest: '60',
              showAdvanced: false,
              showProperties: true
            }
          ]
        };
      }
    case 'LOG-WORKOUT-EXERCISE-DELETE':
      {
        const exercises = state.exercises;
        const exerciseIndex = action.index;

        return {
          ...state,
          exercises: [
            ...exercises.slice(0, exerciseIndex),
            ...exercises.slice(exerciseIndex + 1)
          ]
        };
      }
    case 'LOG-WORKOUT-EXERCISE-SET-DATA':
      {
        const exercises = state.exercises;
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
        };
      }

    case 'LOG-WORKOUT-SET-DATA':
      {
        const date = action.date;
        const notes = action.notes;
        const dateFormHint = action.date ? '' : 'Required or invalid'

        return {
          ...state,
          notes: notes,
          date: date,
          dateFormHint: dateFormHint
        };
      }

    case 'LOG-WORKOUT-SAVE':
      {
        const today = moment().format('YYYY-MM-DD');

        return {
          componentMounted: true,
          notes: '',
          date: today,
          exercises: []
        };
      }

    default:
      return state;
  }
};

export default logWorkoutReducer;
