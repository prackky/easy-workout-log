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

  describe(c.ACCOUNT_SET_DATA, () => {
    it('should set data', () => {
      // when
      const newState = accountReducer(undefined, actions.accountSetFormData('vic', 'oldPassword', 'password'));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        oldPassword: 'oldPassword',
        password: 'password',
        nameFormHint: '',
        oldPasswordFormHint: '',
        passwordFormHint: ''
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set data when no password information provided', () => {
      // when
      const newState = accountReducer(undefined, actions.accountSetFormData('vic', '', ''));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        oldPassword: '',
        password: '',
        nameFormHint: '',
        oldPasswordFormHint: '',
        passwordFormHint: ''
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set name form hint for missing name', () => {
      // when
      const newState = accountReducer(undefined, actions.accountSetFormData('', '', ''));

      // then
      const expectedState = {
        ...initialState,
        name: '',
        oldPassword: '',
        password: '',
        nameFormHint: 'Name is required.',
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
      const newState = accountReducer(undefined, actions.accountSetFormData('vic', 'oldPassword', '1234567'));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        nameFormHint: '',
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

  describe(c.ACCOUNT_UPDATE_SUCCESS, () => {
    it('should reset account form after success to hide password information', () => {
      // when
      const newState = accountReducer(undefined, actions.accountUpdateSuccess());

      // then
      const expectedState = {
        ...initialState
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
