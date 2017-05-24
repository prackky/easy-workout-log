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
      .equal({});
  });

  describe('LOG-WORKOUT', () => {
    const today = moment().format('YYYY-MM-DD');

    it('should add logWorkout for LOG-WORKOUT', () => {
      // when
      const newState = userReducer(undefined, { type: 'LOG-WORKOUT' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            type: 'weight',
            notes: '',
            date: today,
            exercises: []
          }
        });
    });

    it('should maintain existing state for LOG-WORKOUT', () => {
      // when
      const newState = userReducer({
        snoop: 'dawg'
      }, { type: 'LOG-WORKOUT' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          snoop: 'dawg',
          logWorkout: {
            type: 'weight',
            notes: '',
            date: today,
            exercises: []
          }
        });
    });
  });

  describe('LOG-WORKOUT-EXERCISE', () => {
    it('should add an exercise for LOG-WORKOUT-EXERCISE', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          type: 'weight',
          exercises: []
        }
      }, { type: 'LOG-WORKOUT-EXERCISE' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            type: 'weight',
            exercises: [
              {
                name: 'squats',
                reps: 8,
                weight: 100,
                sets: 3
              }
            ]
          }
        });
    });
  });

  describe('LOG-WORKOUT-EXERCISE-DELETE', () => {
    it('should remove the specified exercise for LOG-WORKOUT-EXERCISE-DELETE', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          type: 'weight',
          exercises: [{ exercise: 'a' }, { exercise: 'b' }, { exercise: 'c' }]
        }
      }, { type: 'LOG-WORKOUT-EXERCISE-DELETE', index: 1 });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            type: 'weight',
            exercises: [{ exercise: 'a' }, { exercise: 'c' }]
          }
        });
    });

    it('should remove the first exercise for LOG-WORKOUT-EXERCISE-DELETE', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          type: 'weight',
          exercises: [{ exercise: 'a' }, { exercise: 'b' }, { exercise: 'c' }]
        }
      }, { type: 'LOG-WORKOUT-EXERCISE-DELETE', index: 0 });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            type: 'weight',
            exercises: [{ exercise: 'b' }, { exercise: 'c' }]
          }
        });
    });

    it('should remove the last exercise for LOG-WORKOUT-EXERCISE-DELETE', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          type: 'weight',
          exercises: [{ exercise: 'a' }, { exercise: 'b' }, { exercise: 'c' }]
        }
      }, { type: 'LOG-WORKOUT-EXERCISE-DELETE', index: 2 });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            type: 'weight',
            exercises: [{ exercise: 'a' }, { exercise: 'b' }]
          }
        });
    });
  });
  describe('LOG-WORKOUT-EXERCISE-SET-DATA', () => {
    it('should update the specified exercise', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          exercises: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
        }
      }, {
        type: 'LOG-WORKOUT-EXERCISE-SET-DATA',
        exerciseIndex: 1,
        exercise: { name: 'changed', snoop: 'dawg' }
      });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            exercises: [{ name: 'a' }, { name: 'changed', snoop: 'dawg', nameFormHint: '' }, { name: 'c' }]
          }
        });
    });
    
    it('should set the nameFormHint for an empty name', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          exercises: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
        }
      }, {
        type: 'LOG-WORKOUT-EXERCISE-SET-DATA',
        exerciseIndex: 1,
        exercise: { name: '' }
      });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            exercises: [{ name: 'a' }, { name: '', nameFormHint: 'Required.' }, { name: 'c' }]
          }
        });
    });


  });

  describe('LOG-WORKOUT-SET-DATA', () => {
    it('should set the date and notes', () => {
      // when
      const now = new Date();

      const newState = userReducer({
        logWorkout: {
          date: null,
          notes: ''
        }
      }, { type: 'LOG-WORKOUT-SET-DATA', date: now, notes: 'blah' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            date: now,
            dateFormHint: '',
            notes: 'blah'
          }
        });
    });
    
    it('should set the dateFormHint for empty date', () => {
      // when
      const newState = userReducer({
        logWorkout: {
          date: null,
          notes: ''
        }
      }, { type: 'LOG-WORKOUT-SET-DATA', date: '', notes: 'blah' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          logWorkout: {
            date: '',
            dateFormHint: 'Required or invalid',
            notes: 'blah'
          }
        });
    });

  });


});
