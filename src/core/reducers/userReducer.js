
const userReducer = (state = {}, action) => {
  switch(action.type) {
    case 'LOG-WORKOUT':
      return {
        ...state,
        logWorkout: {
          type: 'weight',
          exercises: []
        }
      };
    default: 
      return state;
  }
};

export default userReducer;
