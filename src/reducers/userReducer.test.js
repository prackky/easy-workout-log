import { expect } from 'chai';
import moment from 'moment';

import userReducer from './userReducer';

describe('userReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = userReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal({logWorkout: {}, data: {authToken: undefined}});
  });

});
