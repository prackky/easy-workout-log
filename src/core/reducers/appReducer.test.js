import { expect } from 'chai';

import appReducer from './appReducer';

describe('appReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = appReducer(undefined, { type: '' });

    // then
    expect(newState).to.deep.equal({ user: { logWorkout: {} }, global: { loadingCounter: 0, userNotifications: [] } });
  })
});
