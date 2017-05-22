import {expect} from 'chai';

import userReducer from './userReducer';

describe('userReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = userReducer(undefined, {type: ''});

    // then
    expect(newState)
      .to
      .deep
      .equal({});
  });

  it('should add logWorkout for LOG-WORKOUT', () => {
    // when
    const newState = userReducer(undefined, {type: 'LOG-WORKOUT'});

    // then
    expect(newState)
      .to
      .deep
      .equal({
        logWorkout: {
          type: 'weight',
          exercises: []
        }
      });
  });

  it('should maintain existing state for LOG-WORKOUT', () => {
    // when
    const newState = userReducer({
      snoop: 'dawg'
    }, {type: 'LOG-WORKOUT'});

    // then
    expect(newState)
      .to
      .deep
      .equal({
        snoop: 'dawg',
        logWorkout: {
          type: 'weight',
          exercises: []
        }
      });
  });

  it('should add an exercise for LOG-WORKOUT-EXERCISE', () => {
    // when
    const newState = userReducer({
      logWorkout: {
        type: 'weight',
        exercises: []
      }
    }, {type: 'LOG-WORKOUT-EXERCISE'});

    // then
    expect(newState)
      .to
      .deep
      .equal({
        logWorkout: {
          type: 'weight',
          exercises: [
            {
              exercise: 'squats',
              reps: 8,
              weight: 100,
              sets: 3
            }
          ]
        }
      });
  });
});
