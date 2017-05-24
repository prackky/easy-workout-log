const userReducer = (state = {}, action) => {
  switch (action.type) {

    case 'LOG-WORKOUT':
      return {
        ...state,
        logWorkout: {
          type: 'weight',
          notes: '',
          date: null,
          time: null,
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
    default:
      return state;
  }
};

export default userReducer;
