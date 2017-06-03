export const initialState = {
  authToken: undefined
};

const userDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER-DATA-AUTH-SUCCESS':
      {
        const {authToken} = action;

        return {
          ...state,
          authToken: authToken
        };
      }
    default:
      return state;
  }
};

export default userDataReducer;
