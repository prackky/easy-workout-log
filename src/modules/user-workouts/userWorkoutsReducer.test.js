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
        lastWorkoutDate: '2017-01-01',
        displayMoreWorkouts: false
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
        lastWorkoutDate: '2016-01-01',
        displayMoreWorkouts: false
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
        lastWorkoutDate: '2016-01-01',
        displayMoreWorkouts: false
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
        lastWorkoutDate: '2014-01-01',
        displayMoreWorkouts: false
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should set displayMoreWorkouts to true when workouts count >= 20', () => {
      // when
      const workouts = [{ id: 1, date: '2017-01-01' }, { id: 2, date: '2016-01-01' }, { id: 3, date: '2017-01-02' }, { id: 4, date: '2017-01-03' }, { id: 5, date: '2017-01-04' }, { id: 6, date: '2017-01-05' }, { id: 7, date: '2017-01-07' }, { id: 8, date: '2017-01-08' }, { id: 9, date: '2017-01-09' }, { id: 10, date: '2017-01-10' }, { id: 11, date: '2017-01-11' }, { id: 12, date: '2017-01-12' }, { id: 13, date: '2017-01-13' }, { id: 14, date: '2017-01-14' }, { id: 15, date: '2017-01-15' }, { id: 16, date: '2017-01-16' }, { id: 17, date: '2017-01-17' }, { id: 18, date: '2017-01-18' }, { id: 19, date: '2017-01-19' }, { id: 20, date: '2017-01-20' }];

      const newState = userWorkoutsReducer(initialState, actions.userWorkoutsFetchSuccess(workouts));

      // then
      const expectedState = {
        ...initialState,
        workouts: {
          '1': { id: 1, date: '2017-01-01' },
          '2': { id: 2, date: '2016-01-01' },
          '3': { id: 3, date: '2017-01-02' },
          '4': { id: 4, date: '2017-01-03' },
          '5': { id: 5, date: '2017-01-04' },
          '6': { id: 6, date: '2017-01-05' },
          '7': { id: 7, date: '2017-01-07' },
          '8': { id: 8, date: '2017-01-08' },
          '9': { id: 9, date: '2017-01-09' },
          '10': { id: 10, date: '2017-01-10' },
          '11': { id: 11, date: '2017-01-11' },
          '12': { id: 12, date: '2017-01-12' },
          '13': { id: 13, date: '2017-01-13' },
          '14': { id: 14, date: '2017-01-14' },
          '15': { id: 15, date: '2017-01-15' },
          '16': { id: 16, date: '2017-01-16' },
          '17': { id: 17, date: '2017-01-17' },
          '18': { id: 18, date: '2017-01-18' },
          '19': { id: 19, date: '2017-01-19' },
          '20': { id: 20, date: '2017-01-20' }
        },
        lastWorkoutDate: '2016-01-01',
        displayMoreWorkouts: true
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
