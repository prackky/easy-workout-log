export const initialState = {
  name: '',
  email: '',
  emailFormHint: '',
  password: '',
  passwordFormHint: ''
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP-SET-DATA':
      {
        const {name, email, password} = action;

        return {
          ...state,
          name: name,
          email: email,
          password: password
        };
      }
    default:
      return state;
  }
};

export default signupReducer;
