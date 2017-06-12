import { expect } from 'chai';
import moment from 'moment';

import logWorkoutReducer from './logWorkoutReducer';
import actions from './logWorkoutActions';

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

  describe('LOG-WORKOUT-SUCCESS', () => {
    const today = moment().format('YYYY-MM-DD');

    it('should add logWorkout for LOG-WORKOUT-SUCCESS', () => {
      // when
      const newState = logWorkoutReducer(undefined, actions.logWorkoutSuccess(['a', 'b']));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          componentMounted: true,
          type: 'weight',
          notes: '',
          date: today,
          exercises: [],
          showTempoHelp: false,
          showRestHelp: false,
          allExercises: ['a', 'b']
        });
    });

    it('should maintain existing state for LOG-WORKOUT-SUCCESS', () => {
      // when
      const newState = logWorkoutReducer({
        snoop: 'dawg'
      }, actions.logWorkoutSuccess([]));

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
          exercises: [],
          showTempoHelp: false,
          showRestHelp: false,
          allExercises: []
        });
    });
  });

  describe('LOG-WORKOUT-SET-DATA', () => {
    it('should set data', () => {
      // when
      const now = new Date();

      const newState = logWorkoutReducer({
        date: null,
        notes: '',
        showTempoHelp: false,
        showRestHelp: false
      }, actions.logWorkoutSetData(now, 'blah', true, true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          date: now,
          dateFormHint: '',
          notes: 'blah',
          showTempoHelp: true,
          showRestHelp: true
        });
    });

    it('should set the dateFormHint for empty date', () => {
      // when
      const newState = logWorkoutReducer({
        date: null,
        notes: '',
        showTempoHelp: false,
        showRestHelp: false
      }, actions.logWorkoutSetData('', 'blah'));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          date: '',
          dateFormHint: 'Required or invalid',
          notes: 'blah',
          showTempoHelp: false,
          showRestHelp: false
        });
    });

  });

  describe('LOG-WORKOUT-SET-SHOW-TEMPO-HELP', () => {
    it('should set help', () => {
      // when
      const newState = logWorkoutReducer({
        date: null,
        notes: '',
        showTempoHelp: false,
        showRestHelp: false
      }, actions.logWorkoutSetShowTempoHelp(true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          date: null,
          notes: '',
          showTempoHelp: true,
          showRestHelp: false
        });
    });

  });

  describe('LOG-WORKOUT-SET-SHOW-REST-HELP', () => {
    it('should set help', () => {
      // when
      const newState = logWorkoutReducer({
        date: null,
        notes: '',
        showTempoHelp: false,
        showRestHelp: false
      }, actions.logWorkoutSetShowRestHelp(true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          date: null,
          notes: '',
          showTempoHelp: false,
          showRestHelp: true
        });
    });

  });

  describe('LOG-WORKOUT-SET-SHOW-WEIGHT-HELP', () => {
    it('should set help', () => {
      // when
      const newState = logWorkoutReducer({
        showWeightHelp: false
      }, actions.logWorkoutSetShowWeightHelp(true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          showWeightHelp: true
        });
    });

  });

  describe('LOG-WORKOUT-SAVE', () => {
    const today = moment().format('YYYY-MM-DD');

    it('should clean data', () => {
      // when
      const newState = logWorkoutReducer({
        date: today,
        notes: 'workout in progress',
        componentMounted: true,
        exercises: ['a']
      }, actions.logWorkoutSaveSuccess());

      // then
      expect(newState)
        .to
        .deep
        .equal({ date: today, notes: '', componentMounted: false, exercises: [] });
    });

  });


});
