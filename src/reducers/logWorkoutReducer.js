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
        exercises: [],
        showTempoHelp: false,
        showRestHelp: false
      };

    case 'LOG-WORKOUT-EXERCISE':
      {
        const exercises = state.exercises;
        const {name, reps, weight, sets, tempo, rest, showAdvanced} = action;

        return {
          ...state,
          exercises: [
            ...exercises, {
              name: name ? name : 'squats',
              reps: reps ? reps : '8',
              weight: weight ? weight : '100',
              sets: sets ? sets : '1',
              tempo: tempo ? tempo : '101',
              rest: rest ? rest : '60',
              showAdvanced: showAdvanced ? true : false,
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
        const {date, notes, showTempoHelp, showRestHelp} = action;
        const dateFormHint = action.date ? '' : 'Required or invalid'

        return {
          ...state,
          notes: notes,
          date: date,
          dateFormHint: dateFormHint,
          showTempoHelp: showTempoHelp,
          showRestHelp: showRestHelp
        };
      }
    
    case 'LOG-WORKOUT-SET-SHOW-TEMPO-HELP':
      {
        return {
          ...state,
          showTempoHelp: action.showTempoHelp
        };
      }
    
    case 'LOG-WORKOUT-SET-SHOW-REST-HELP':
      {
        return {
          ...state,
          showRestHelp: action.showRestHelp
        };
      }

    case 'LOG-WORKOUT-SAVE-SUCCESS':
      {
        const today = moment().format('YYYY-MM-DD');

        return {
          componentMounted: false,
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
