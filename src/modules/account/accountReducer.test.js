import { expect } from 'chai';

import accountReducer, { initialState } from './accountReducer';
import actions, { c } from './accountActions';

describe('accountReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = accountReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.ACCOUNT_SET_PASSWORD_DATA, () => {
    it('should set data', () => {
      // when
      const newState = accountReducer(undefined, actions.accountSetPasswordData('oldPassword', 'password'));

      // then
      const expectedState = {
        ...initialState,
        oldPassword: 'oldPassword',
        password: 'password',
        oldPasswordFormHint: '',
        passwordFormHint: ''
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set password form hint for password less than 8 characters', () => {
      // when
      const newState = accountReducer(undefined, actions.accountSetPasswordData('oldPassword', '1234567'));

      // then
      const expectedState = {
        ...initialState,
        oldPassword: 'oldPassword',
        oldPasswordFormHint: '',
        password: '1234567',
        passwordFormHint: 'Password must be minimum 8 characters in length.'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

  describe(c.ACCOUNT_PASSWORD_UPDATE_SUCCESS, () => {
    it('should reset password information after success', () => {
      // given 
      const is = {
        ...initialState,
        name: 'vic',
        oldPassword: 'oldPassword',
        password: 'xxx'
      };

      // when
      const newState = accountReducer(is, actions.accountPasswordUpdateSuccess());

      // then
      const expectedState = {
        ...is,
        oldPassword: '',
        oldPasswordFormHint: '',
        password: '',
        passwordFormHint: ''
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

  describe(c.ACCOUNT_SET_DATA, () => {
    it('should set account data', () => {
      // when
      const newState = accountReducer(undefined, actions.accountSetData({ name: 'vic', units: 3 }));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        units: 3
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

  describe(c.ACCOUNT_DATA_UPDATE_SUCCESS, () => {
    it('should leave the state on data update success', () => {
      // given 
      const is = {
        ...initialState,
        name: 'vic',
        units: 34
      };

      // when
      const newState = accountReducer(is, actions.accountDataUpdateSuccess());

      // then
      const expectedState = {
        ...is
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
