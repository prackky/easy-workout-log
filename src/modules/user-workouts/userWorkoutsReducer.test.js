import { expect } from 'chai';

import ewoloTestUtil from '../../common/ewoloTestUtil';
import userWorkoutsReducer, { initialState } from './userWorkoutsReducer';
import actions, { c } from './userWorkoutsActions';

describe('userWorkoutsReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = userWorkoutsReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.USER_WORKOUTS_FETCH_SUCCESS, () => {
    it('should set data', () => {
      // when
      const workouts = [{ snoop: 'dawg' }];
      const newState = userWorkoutsReducer(undefined, actions.userWorkoutsFetchSuccess(workouts));

      // then
      const expectedState = {
        ...initialState,
        workouts: workouts
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });
  });

  describe(c.USER_WORKOUTS_ANALYSIS_FETCH_SUCCESS, () => {
    it('should set data', () => {
      // when
      const workoutsAnalysis = ewoloTestUtil.workoutsAnalysisResponseData;
      const newState = userWorkoutsReducer(undefined, actions.userWorkoutsAnalysisFetchSuccess(workoutsAnalysis));

      // then
      const expectedState = {
        ...initialState,
        workoutsAnalysis: workoutsAnalysis
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });
  });

  describe(c.USER_WORKOUTS_DELETE_SUCCESS, () => {
    it('should delete the first workout', () => {
      // given
      const state = {
        ...initialState,
        workouts: [{ id: 1, snoop: 'dawg' }, { id: 2 }, { id: 3 }]
      };

      // when
      const newState = userWorkoutsReducer(state, actions.userWorkoutsDeleteSuccess(1));

      // then
      const expectedState = {
        ...initialState,
        workouts: [{ id: 2 }, { id: 3 }]
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should delete the second workout', () => {
      // given
      const state = {
        ...initialState,
        workouts: [{ id: 1, snoop: 'dawg' }, { id: 2 }, { id: 3 }]
      };

      // when
      const newState = userWorkoutsReducer(state, actions.userWorkoutsDeleteSuccess(2));

      // then
      const expectedState = {
        ...initialState,
        workouts: [{ id: 1, snoop: 'dawg' }, { id: 3 }]
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should delete the last workout', () => {
      // given
      const state = {
        ...initialState,
        workouts: [{ id: 1, snoop: 'dawg' }, { id: 2 }, { id: 3 }]
      };

      // when
      const newState = userWorkoutsReducer(state, actions.userWorkoutsDeleteSuccess(3));

      // then
      const expectedState = {
        ...initialState,
        workouts: [{ id: 1, snoop: 'dawg' }, { id: 2 }]
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });
  });

  describe(c.USER_WORKOUTS_SET_VIEW_DETAILS, () => {
    it('should set data', () => {
      // when
      const newState = userWorkoutsReducer(undefined, actions.userWorkoutsSetViewDetails(22, true));

      // then
      const expectedState = {
        ...initialState,
        workoutsViewDetails: {
          22: true
        }
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });
  });

});
