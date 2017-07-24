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
    it('should normalize and set data', () => {
      // when
      const workouts = [{ id: 1, snoop: 'dawg' }, { id: 2, yoyo: 'ma', date: '2017-01-01' }];
      const newState = userWorkoutsReducer(undefined, actions.userWorkoutsFetchSuccess(workouts));

      // then
      const expectedState = {
        ...initialState,
        workouts: {
          '1': {
            id: 1,
            snoop: 'dawg'
          },
          '2': {
            id: 2,
            yoyo: 'ma',
            date: '2017-01-01'
          }
        },
        lastWorkoutDate: '2017-01-01'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should keep existing data', () => {
      // when
      const workouts = [{ id: 1, snoop: 'dawg' }, { id: 2, yoyo: 'ma' }];
      const originalState = {
        ...initialState,
        workouts: {
          '1': {
            id: 1,
            snoop: 'dawg'
          }
        },
        lastWorkoutDate: '2017-01-01'
      };

      const newState = userWorkoutsReducer(originalState, actions.userWorkoutsFetchSuccess([{ id: 2, yoyo: 'ma' }, { id: 3, jimmy: 'jones', date: '2016-01-01' }]));

      // then
      const expectedState = {
        ...initialState,
        workouts: {
          '1': {
            id: 1,
            snoop: 'dawg'
          },
          '2': {
            id: 2,
            yoyo: 'ma'
          },
          '3': {
            id: 3,
            jimmy: 'jones',
            date: '2016-01-01'
          }
        },
        lastWorkoutDate: '2016-01-01'
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should re-calculate lastWorkoutDate', () => {
      // when
      const workouts = [{ id: 1, date: '2017-01-01' }, { id: 2, date: '2016-01-01' }];
      const originalState = {
        ...initialState,
        workouts: {
          '1': {
            id: 1,
            date: '2017-01-01'
          },
          '2': {
            id: 2,
            date: '2016-01-01'
          }
        },
        lastWorkoutDate: '2016-01-01'
      };

      const newState = userWorkoutsReducer(originalState, actions.userWorkoutsFetchSuccess([{ id: 2, date: '2014-01-01' }, { id: 3, date: '2016-10-01' }]));

      // then
      const expectedState = {
        ...initialState,
        workouts: {
          '1': {
            id: 1,
            date: '2017-01-01'
          },
          '2': {
            id: 2,
            date: '2014-01-01'
          },
          '3': {
            id: 3,
            date: '2016-10-01'
          }
        },
        lastWorkoutDate: '2014-01-01'
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
        workouts: { '1': { id: 1, snoop: 'dawg' }, '2': { id: 2 }, '3': { id: 3 } }
      };

      // when
      const newState = userWorkoutsReducer(state, actions.userWorkoutsDeleteSuccess(1));

      // then
      const expectedState = {
        ...initialState,
        workouts: { '2': { id: 2 }, '3': { id: 3 } }
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
