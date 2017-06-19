import { expect } from 'chai';

import userWorkoutsReducer, { initialState } from './userWorkoutsReducer';
import actions, {c} from './userWorkoutsActions';

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
      const workouts = [{snoop: 'dawg'}];
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
