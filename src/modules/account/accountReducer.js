import ewoloUtil from '../../common/ewoloUtil';

import { c } from './accountActions';

export const initialState = {
  name: '',
  nameFormHint: '',
  oldPassword: '',
  oldPasswordFormHint: '',
  password: '',
  passwordFormHint: ''
};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.ACCOUNT_SET_PASSWORD_DATA:
      {
        const { oldPassword, password } = action;

        return {
          ...state,
          oldPassword,
          password,
          oldPasswordFormHint: oldPassword ? ewoloUtil.validatePassword(oldPassword) : '',
          passwordFormHint: password ? ewoloUtil.validatePassword(password) : ''
        };
      }
    case c.ACCOUNT_PASSWORD_UPDATE_SUCCESS:
      {
        return {
          ...state,
          oldPassword: '',
          oldPasswordFormHint: '',
          password: '',
          passwordFormHint: ''
        };
      }
    default:
      return state;
  }
};

export default accountReducer;
