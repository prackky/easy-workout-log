import moment from 'moment';

import { c } from './logWorkoutActions.js';

const copyExercises = (exercises) => {
  const result = [];

  for (const exercise of exercises) {
    result.push({
      ...exercise,
      setIndex: 1,
      superSetIndex: 0
    });
  }

  return result;
};

const calculateSuperSetIndexes = (exercises) => {
  let isCircuit = false;

  for (let i = 0; i < exercises.length; ++i) {
    const current = exercises[i];

    if (i === 0) {
      if (current.rest === '0') {
        isCircuit = true;
        current.superSetIndex = 1;
      }
    }

    if (i > 0) {
      const previous = exercises[i - 1];

      if (current.rest === '0') {
        if (isCircuit) {
          current.superSetIndex = previous.superSetIndex + 1;
        } else {
          isCircuit = true;
          current.superSetIndex = 1;
        }
      } else {
        if (isCircuit) {
          isCircuit = false;
          current.superSetIndex = previous.superSetIndex + 1;
        }
      }
    }
  }
}

const calculateSetIndexes = (exercises) => {
  for (let i = 0; i < exercises.length; ++i) {
    const current = exercises[i];

    if (i > 0) {
      const previous = exercises[i - 1];
      if (current.name === previous.name) {
        current.setIndex = previous.setIndex + 1;
      }
    }
  }
}

const logWorkoutReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LOG_WORKOUT:
      {
        return {
          componentMounted: true,
          date: moment().format('YYYY-MM-DD'),
          notes: '',
          exercises: [],
          showTempoHelp: false,
          showRestHelp: false,
          showWeightHelp: false
        };
      }
    case c.LOG_WORKOUT_EXERCISE:
      {
        const exercises = copyExercises(state.exercises);
        const { name, reps, weight, sets, tempo, rest, showAdvanced } = action;

        exercises.push({
          name: name ? name : 'squats',
          reps: reps ? reps : '8',
          weight: weight ? weight : '100',
          sets: sets ? sets : '1',
          tempo: tempo ? tempo : '101',
          rest: rest ? rest : '60',
          showAdvanced: showAdvanced ? true : false,
          showProperties: true,
          setIndex: 1,
          superSetIndex: 0
        });

        calculateSetIndexes(exercises);
        calculateSuperSetIndexes(exercises);

        return {
          ...state,
          exercises: exercises
        };
      }
    case c.LOG_WORKOUT_EXERCISE_DELETE:
      {
        const exercises = copyExercises(state.exercises);
        const exerciseIndex = action.index;

        exercises.splice(exerciseIndex, 1);
        calculateSetIndexes(exercises);
        calculateSuperSetIndexes(exercises);

        return {
          ...state,
          exercises: exercises
        };
      }
    case c.LOG_WORKOUT_EXERCISE_SET_DATA:
      {
        const exercises = copyExercises(state.exercises);
        const exerciseIndex = action.exerciseIndex;

        const exercise = {
          ...exercises[exerciseIndex],
          ...action.exercise,
          setIndex: 1,
          superSetIndex: 0,
          nameFormHint: action.exercise.name ? '' : 'Required.',
          repsFormHint: action.exercise.reps ? '' : 'Required.'
        };
        exercises[exerciseIndex] = exercise;

        calculateSetIndexes(exercises);
        calculateSuperSetIndexes(exercises);

        return {
          ...state,
          exercises: exercises
        };

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

        /*
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
        */
      }

    case c.LOG_WORKOUT_SET_DATA:
      {
        const { date, notes, showTempoHelp, showRestHelp } = action;
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

    case c.LOG_WORKOUT_SET_SHOW_TEMPO_HELP:
      {
        return {
          ...state,
          showTempoHelp: action.showTempoHelp
        };
      }

    case c.LOG_WORKOUT_SET_SHOW_REST_HELP:
      {
        return {
          ...state,
          showRestHelp: action.showRestHelp
        };
      }

    case c.LOG_WORKOUT_SET_SHOW_WEIGHT_HELP:
      {
        return {
          ...state,
          showWeightHelp: action.showWeightHelp
        };
      }

    case c.LOG_WORKOUT_SAVE_SUCCESS:
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
