import ewoloUtil from '../../common/ewoloUtil';

import {c} from './signupActions';

export const initialState = {
  name: '',
  email: '',
  emailFormHint: '',
  password: '',
  passwordFormHint: '',
  afterSuccess: {
    action: undefined,
    redirect: '/' // by default redirect to home after signup
  }
};

const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.SIGNUP_SET_DATA:
      {
        const {name, email, password} = action;

        return {
          ...state,
          name: name,
          email: email,
          password: password,
          emailFormHint: ewoloUtil.validateEmail(email),
          passwordFormHint: ewoloUtil.validatePassword(password)
        };
      }
    case c.SIGNUP_SET_AFTER_SUCCESS:
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
