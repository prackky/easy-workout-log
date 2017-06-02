import { expect } from 'chai';

import signupReducer, { initialState } from './signupReducer';
import actions from '../actions/signupActions';

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
        password: 'sdk;jhskljdghdksfljghf'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
