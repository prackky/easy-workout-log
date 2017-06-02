const initialState = {
  loadingCounter: 0
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK-START':
      {
        return {
          ...state,
          loadingCounter: state.loadingCounter + 1
        };
      }
    case 'TASK-END':
      {
        return {
          ...state,
          loadingCounter: state.loadingCounter - 1
        };
      }
    default:
      return state;
  }
};

export default globalReducer;
