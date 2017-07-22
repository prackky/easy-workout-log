import { expect } from 'chai';

import loginReducer, { initialState } from './loginReducer';
import actions, { c } from './loginActions';

describe('loginReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = loginReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.LOGIN_SET_DATA, () => {
    it('should set data', () => {
      // when
      const newState = loginReducer(undefined, actions.loginSetData('vic@smalldata.tech', 'sdksdfsdfsdf', 'xxx'));

      // then
      const expectedState = {
        ...initialState,
        email: 'vic@smalldata.tech',
        password: 'sdksdfsdfsdf',
        emailFormHint: '',
        passwordFormHint: '',
        text: 'xxx'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set email form hint for missing email', () => {
      // when
      const newState = loginReducer(undefined, actions.loginSetData('', 'sdk;jhskljdghdksfljghf'));

      // then
      const expectedState = {
        ...initialState,
        email: '',
        password: 'sdk;jhskljdghdksfljghf',
        emailFormHint: 'Email is required.',
        text: undefined
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set password form hint for password less than 8 characters', () => {
      // when
      const newState = loginReducer(undefined, actions.loginSetData('vic@smalldata.tech', '1234567'));

      // then
      const expectedState = {
        ...initialState,
        email: 'vic@smalldata.tech',
        password: '1234567',
        passwordFormHint: 'Password must be minimum 8 characters in length.',
        text: undefined
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });
  describe(c.LOGIN_SET_AFTER_SUCCESS, () => {
    it('should set things to do after success', () => {
      // when
      const newState = loginReducer(undefined, actions.loginSetAfterSuccess({ type: 'LOG-WORKOUT-SAVE' }, '/xxx'));

      // then
      const expectedState = {
        ...initialState,
        afterSuccess: {
          action: {
            type: 'LOG-WORKOUT-SAVE'
          },
          redirect: '/xxx'
        }
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
