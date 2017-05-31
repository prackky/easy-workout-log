import { expect } from 'chai';
import moment from 'moment';

import logWorkoutReducer from './logWorkoutReducer';

describe('logWorkoutReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = logWorkoutReducer(undefined, { type: '' });

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
      const newState = logWorkoutReducer(undefined, { type: 'LOG-WORKOUT' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          componentMounted: true,
          type: 'weight',
          notes: '',
          date: today,
          exercises: []
        });
    });

    it('should maintain existing state for LOG-WORKOUT', () => {
      // when
      const newState = logWorkoutReducer({
        snoop: 'dawg'
      }, { type: 'LOG-WORKOUT' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          snoop: 'dawg',
          componentMounted: true,
          type: 'weight',
          notes: '',
          date: today,
          exercises: []
        });
    });
  });

  describe('LOG-WORKOUT-EXERCISE', () => {
    it('should add an exercise for LOG-WORKOUT-EXERCISE', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: []
      }, { type: 'LOG-WORKOUT-EXERCISE' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          type: 'weight',
          exercises: [
            {
              name: 'squats',
              reps: '8',
              weight: '100',
              sets: '1',
              tempo: '101',
              rest: '60',
              showAdvanced: false,
              showProperties: true
            }
          ]
        });
    });
  });

  describe('LOG-WORKOUT-EXERCISE-DELETE', () => {
    it('should remove the specified exercise for LOG-WORKOUT-EXERCISE-DELETE', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: [{ exercise: 'a' }, { exercise: 'b' }, { exercise: 'c' }]
      }, { type: 'LOG-WORKOUT-EXERCISE-DELETE', index: 1 });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          type: 'weight',
          exercises: [{ exercise: 'a' }, { exercise: 'c' }]
        });
    });

    it('should remove the first exercise for LOG-WORKOUT-EXERCISE-DELETE', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: [{ exercise: 'a' }, { exercise: 'b' }, { exercise: 'c' }]
      }, { type: 'LOG-WORKOUT-EXERCISE-DELETE', index: 0 });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          type: 'weight',
          exercises: [{ exercise: 'b' }, { exercise: 'c' }]
        });
    });

    it('should remove the last exercise for LOG-WORKOUT-EXERCISE-DELETE', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: [{ exercise: 'a' }, { exercise: 'b' }, { exercise: 'c' }]
      }, { type: 'LOG-WORKOUT-EXERCISE-DELETE', index: 2 });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          type: 'weight',
          exercises: [{ exercise: 'a' }, { exercise: 'b' }]
        });
    });
  });
  describe('LOG-WORKOUT-EXERCISE-SET-DATA', () => {
    it('should update the specified exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b', reps: '1' }, { name: 'c' }]
      }, {
        type: 'LOG-WORKOUT-EXERCISE-SET-DATA',
        exerciseIndex: 1,
        exercise: { name: 'changed', snoop: 'dawg', reps: '1' }
      });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a' }, { name: 'changed', snoop: 'dawg', reps: '1', nameFormHint: '', repsFormHint: '' }, { name: 'c' }]
        });
    });

    it('should set the nameFormHint for an empty name', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b', reps: '1' }, { name: 'c' }]
      }, {
        type: 'LOG-WORKOUT-EXERCISE-SET-DATA',
        exerciseIndex: 1,
        exercise: { name: '', reps: '1' }
      });

      // then
      // console.log(newState.logWorkout.exercises[1]);
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a' }, { name: '', nameFormHint: 'Required.', repsFormHint: '', reps: '1' }, { name: 'c' }]
        });
    });


  });

  describe('LOG-WORKOUT-SET-DATA', () => {
    it('should set the date and notes', () => {
      // when
      const now = new Date();

      const newState = logWorkoutReducer({
        date: null,
        notes: ''
      }, { type: 'LOG-WORKOUT-SET-DATA', date: now, notes: 'blah' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          date: now,
          dateFormHint: '',
          notes: 'blah'
        });
    });

    it('should set the dateFormHint for empty date', () => {
      // when
      const newState = logWorkoutReducer({
        date: null,
        notes: ''
      }, { type: 'LOG-WORKOUT-SET-DATA', date: '', notes: 'blah' });

      // then
      expect(newState)
        .to
        .deep
        .equal({
          date: '',
          dateFormHint: 'Required or invalid',
          notes: 'blah'
        });
    });

  });


});
