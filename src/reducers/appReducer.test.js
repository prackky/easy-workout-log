import { expect } from 'chai';

import appReducer from './appReducer';
import {initialState as signupInitialState} from './signupReducer';
import {initialState as globalInitialState} from './globalReducer';

describe('appReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = appReducer(undefined, { type: '' });

    // then
    expect(newState).to.deep.equal({ 
      user: { 
        logWorkout: {} 
      }, 
      signup: signupInitialState,
      global: globalInitialState
    });
  })
});
