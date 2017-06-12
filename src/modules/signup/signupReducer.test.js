import { expect } from 'chai';

import signupReducer, { initialState } from './signupReducer';
import actions from './signupActions';

describe('signupReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = signupReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe('SIGNUP-SET-DATA', () => {
    it('should set data', () => {
      // when
      const newState = signupReducer(undefined, actions.signupSetData('vic', 'vic@smalldata.tech', 'sdk;jhskljdghdksfljghf'));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        email: 'vic@smalldata.tech',
        password: 'sdk;jhskljdghdksfljghf',
        emailFormHint: '',
        passwordFormHint: ''
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set email form hint for missing email', () => {
      // when
      const newState = signupReducer(undefined, actions.signupSetData('vic', '', 'sdk;jhskljdghdksfljghf'));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        email: '',
        password: 'sdk;jhskljdghdksfljghf',
        emailFormHint: 'Email is required.'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set password form hint for password less than 8 characters', () => {
      // when
      const newState = signupReducer(undefined, actions.signupSetData('vic', 'vic@smalldata.tech', '1234567'));

      // then
      const expectedState = {
        ...initialState,
        name: 'vic',
        email: 'vic@smalldata.tech',
        password: '1234567',
        passwordFormHint: 'Password must be minimum 8 characters in length.'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });
  describe('SIGNUP-AFTER-SUCCESS', () => {
    it('should set things to do after success', () => {
      // when
      const newState = signupReducer(undefined, actions.signupAfterSuccess({ type: 'LOG-WORKOUT-SAVE' }, '/dashboard'));

      // then
      const expectedState = {
        ...initialState,
        afterSuccess: {
          action: {
            type: 'LOG-WORKOUT-SAVE'
          },
          redirect: '/dashboard'
        }
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
