import { expect } from 'chai';

import globalReducer from './globalReducer';
import actions from '../actions/globalActions';

describe('globalReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = globalReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal({ loadingCounter: 0 });
  });

  describe('TASK-START', () => {
    it('should increment the loading counter for TASK-START for an undefined state', () => {
      // when
      const newState = globalReducer(undefined, actions.taskStart());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          loadingCounter: 1
        });
    });

    it('should increment the loading counter for TASK-START', () => {
      // when
      const newState = globalReducer({ loadingCounter: 2 }, actions.taskStart());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          loadingCounter: 3
        });
    });
  });

  describe('TASK-END', () => {
    it('should decrement the loading counter for an undefined state', () => {
      // when
      const newState = globalReducer(undefined, actions.taskEnd());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          loadingCounter: -1
        });
    });

    it('should decrement the loading counter', () => {
      // when
      const newState = globalReducer({ loadingCounter: 2 }, actions.taskEnd());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          loadingCounter: 1
        });
    });
  });

});
