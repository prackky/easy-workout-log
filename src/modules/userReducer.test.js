import { expect } from 'chai';
import moment from 'moment';

import userReducer from './userReducer';
import { initialState as userDataInitialState } from './user-data/userDataReducer';
import { initialState as userWorkoutsInitialState } from './user-workouts/userWorkoutsReducer';

describe('userReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = userReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal({ logWorkout: {}, data: userDataInitialState, workouts: userWorkoutsInitialState });
  });

});
