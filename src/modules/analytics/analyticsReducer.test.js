import { expect } from 'chai';

import ewoloTestUtil from '../../common/ewoloTestUtil';
import analyticsReducer, { initialState } from './analyticsReducer';
import actions, { c } from './analyticsActions';

describe('analyticsReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = analyticsReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.ANALYTICS_EXERCISE_SET_DATA, () => {
    it('should set data', () => {
      // when
      const exerciseName = 'the!@@$äé#$%%$^&%*^&(&*(&(❤';
      const data = [{ id: 1, snoop: 'dawg' }];
      const newState = analyticsReducer(undefined, actions.analyticsExerciseSetData(exerciseName, data));

      // then
      const expectedState = {
        ...initialState
      };

      expectedState.exercise[exerciseName] = data;

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set data with funky names - while this is fine it will blow up the application', () => {
      // when
      const exerciseName = 'constructor';
      const data = [{ id: 1, snoop: 'dawg' }];
      const newState = analyticsReducer(undefined, actions.analyticsExerciseSetData(exerciseName, data));

      // then
      const expectedState = {
        ...initialState
      };

      expectedState.exercise[exerciseName] = data;

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should keep existing data', () => {
      // when
      const originalState = {
        ...initialState,
        exercise: {
          'deadlifts': [{
            id: 1,
            snoop: 'dawg'
          }]
        }
      };

      const newState = analyticsReducer(originalState, actions.analyticsExerciseSetData('squats', [{ id: 2, yoyo: 'ma' }]));

      // then
      const expectedState = {
        ...initialState,
        exercise: {
          'deadlifts': [{
            id: 1,
            snoop: 'dawg'
          }],
          'squats': [{
            id: 2,
            yoyo: 'ma'
          }]
        }
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

  describe(c.ANALYTICS_EXERCISE_SET_FILTER_DATA, () => {
    it('should set filter data', () => {
      // given
      const exerciseName = 'the!@@$äé#$%%$^&%*^&(&*(&(❤';
      const dateBefore = '2017-01-01';
      const dateAfter = '2016-01-01';

      // when
      const newState = analyticsReducer(undefined, actions.analyticsExerciseSetFilterData({ exerciseName, dateBefore, dateAfter }));

      // then
      const expectedState = {
        ...initialState,
        exerciseFilterData: {
          exerciseName,
          dateBefore,
          dateAfter
        }
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });

});
