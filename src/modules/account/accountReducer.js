import ewoloUtil from '../../common/ewoloUtil';

import { c } from './accountActions';

export const initialState = {
  oldPassword: '',
  oldPasswordFormHint: '',
  password: '',
  passwordFormHint: '',
  name: '',
  units: 1,
  sex: 1
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
        const {name, units, sex} = action;

        return {
          ...state,
          name,
          units: parseInt(units, 10),
          sex: parseInt(sex, 10)
        };
      }
    default:
      return state;
  }
};

export default accountReducer;
