const userReducer = (state = {}, action) => {
  switch (action.type) {
    
    case 'LOG-WORKOUT':
      return {
        ...state,
        logWorkout: {
          type: 'weight',
          exercises: []
        }
      };
    
    case 'LOG-WORKOUT-EXERCISE':
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

    default:
      return state;
  }
};

export default userReducer;
