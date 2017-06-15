import ewoloUtil from '../../common/ewoloUtil';
import { c } from './loginActions';

export const initialState = {
  email: '',
  emailFormHint: '',
  password: '',
  passwordFormHint: '',
  text: null,
  afterSuccess: {
    action: undefined,
    redirect: '/dashboard' // by default redirect to the dashboard after login
  }
};


const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.LOGIN_SET_DATA:
      {
        const { email, password, text } = action;

        return {
          ...state,
          email: email,
          password: password,
          text: text,
          emailFormHint: ewoloUtil.validateEmail(email),
          passwordFormHint: ewoloUtil.validatePassword(password)
        };
      }
    case c.LOGIN_SET_AFTER_SUCCESS:
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

export default loginReducer;
