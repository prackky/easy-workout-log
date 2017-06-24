import { expect } from 'chai';
import moment from 'moment';

import logWorkoutReducer from './logWorkoutReducer';
import actions, { c } from './logWorkoutActions';

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

  describe(c.LOG_WORKOUT, () => {
    const today = moment().format('YYYY-MM-DD');

    it('should add an empty workout', () => {
      // when
      const newState = logWorkoutReducer(undefined, actions.logWorkout());

      // then
      expect(newState)
        .to
        .deep
        .equal({
          componentMounted: true,
          notes: '',
          date: today,
          exercises: [],
          showTempoHelp: false,
          showRestHelp: false,
          showWeightHelp: false
        });
    });
  });

  describe(c.LOG_WORKOUT_SET_DATA, () => {
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

  describe(c.LOG_WORKOUT_SET_SHOW_TEMPO_HELP, () => {
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

  describe(c.LOG_WORKOUT_SET_SHOW_REST_HELP, () => {
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

  describe(c.LOG_WORKOUT_SET_SHOW_WEIGHT_HELP, () => {
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

  describe(c.LOG_WORKOUT_SAVE_SUCCESS, () => {
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
