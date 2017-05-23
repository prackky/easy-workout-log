const userActions = {
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
  }
};

export default userActions;
