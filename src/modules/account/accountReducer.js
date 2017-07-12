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
    case c.ACCOUNT_SET_DATA:
      {
        const { name, oldPassword, password } = action;

        return {
          ...state,
          name,
          oldPassword,
          password,
          nameFormHint: ewoloUtil.validateRequired(name, 'Name'),
          oldPasswordFormHint: oldPassword ? ewoloUtil.validatePassword(oldPassword) : '',
          passwordFormHint: password ? ewoloUtil.validatePassword(password) : ''
        };
      }
    case c.ACCOUNT_UPDATE_SUCCESS:
      {
        return {
          ...state,
          ...initialState
        };
      }
    default:
      return state;
  }
};

export default accountReducer;
