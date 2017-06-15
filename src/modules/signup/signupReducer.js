export const initialState = {
  name: '',
  email: '',
  emailFormHint: '',
  password: '',
  passwordFormHint: '',
  afterSuccess: {
    action: undefined,
    redirect: '/dashboard' // by default redirect to the dashboard after signup
  }
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SIGNUP-SET-DATA':
      {
        const {name, email, password} = action;

        let emailFormHint = '', passwordFormHint = '';

        if (!email) {
          emailFormHint = 'Email is required.';
        }

        if (!password) {
          passwordFormHint = 'Password is required.';
        }

        if (password && password.length < 8) {
          passwordFormHint = 'Password must be minimum 8 characters in length.';
        }

        return {
          ...state,
          name: name,
          email: email,
          password: password,
          emailFormHint: emailFormHint,
          passwordFormHint: passwordFormHint
        };
      }
    case 'SIGNUP-SET-AFTER-SUCCESS':
      {
        const redirect = action.redirect;
        const actionAfterSuccess = action.action;

        return {
          ...state,
          afterSuccess: {
            action: actionAfterSuccess,
            redirect: redirect
          }
        };
      }
    default:
      return state;
  }
};

export default signupReducer;
