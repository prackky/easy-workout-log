import ewoloUtil from '../../common/ewoloUtil';

import { c } from './accountActions';

export const initialState = {
  name: '',
  nameFormHint: '',
  oldPassword: '',
  oldPasswordFormHint: '',
  password: '',
  passwordFormHint: '',
  units: 1
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
    case c.ACCOUNT_SET_DATA:
      {
        const {name, units} = action;

        return {
          ...state,
          name,
          units: parseInt(units, 10)
        };
      }
    case c.ACCOUNT_DATA_UPDATE_SUCCESS:
      {
        return {
          ...state
        };
      }
    default:
      return state;
  }
};

export default accountReducer;
