import { expect } from 'chai';

import userDataReducer, { initialState } from './userDataReducer';
import actions, { c } from './userDataActions';

describe('userDataReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = userDataReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.USER_DATA_EXERCISE_NAME_ADD, () => {
    it('should add exercise name at the front', () => {
      // when
      const newState = userDataReducer({ exerciseNames: ['dawg'] }, actions.userDataExerciseNameAdd('snoop'));

      // then
      const expectedState = {
        exerciseNames: ['snoop', 'dawg']
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });
  
  describe(c.USER_DATA_FETCH_SUCCESS, () => {
    it('should set the correct user data', () => {
      // when
      const newState = userDataReducer({ units: 1 }, actions.userDataFetchSuccess([], 'a', 'a@a.com', 42));

      // then
      const expectedState = {
        exerciseNames: [],
        name: 'a',
        email: 'a@a.com',
        units: 42
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
