import { expect } from 'chai';
import moment from 'moment';

import ewoloTestUtil from '../../common/ewoloTestUtil';
import ewoloUtil from '../../common/ewoloUtil';
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
    const today = ewoloUtil.getTodaysDate();

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

  describe(c.LOG_WORKOUT_COPY, () => {
    const today = ewoloUtil.getTodaysDate();

    it('should copy a workout', () => {
      // when
      const newState = logWorkoutReducer(undefined, actions.logWorkoutCopy(ewoloTestUtil.mock.savedWorkout));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          componentMounted: true,
          notes: 'bla',
          date: today,
          exercises: [
            {
              name: 'Bench Press',
              reps: 8,
              sets: 1,
              weight: 88,
              tempo: '101',
              rest: 0,
              workoutOrder: 1,
              superSetIndex: 1,
              setIndex: 1,
              showProperties: true,
              showAdvanced: false
            }, {
              name: 'Bent Over Barbell Rows',
              reps: 8,
              sets: 1,
              weight: 88,
              tempo: '101',
              rest: 60,
              workoutOrder: 2,
              superSetIndex: 2,
              setIndex: 1,
              showProperties: true,
              showAdvanced: false
            }, {
              name: 'Incline Barbell Bench Press',
              reps: 8,
              sets: 1,
              weight: 66,
              tempo: '101',
              rest: 60,
              workoutOrder: 3,
              setIndex: 1,
              superSetIndex: 0,
              showProperties: true,
              showAdvanced: false
            }, {
              name: 'Incline Barbell Bench Press',
              reps: 6,
              sets: 1,
              weight: 66,
              tempo: '101',
              rest: 60,
              workoutOrder: 4,
              setIndex: 2,
              superSetIndex: 0,
              showProperties: true,
              showAdvanced: false
            }
          ],
          showTempoHelp: false,
          showRestHelp: false,
          showWeightHelp: false
        });
    });
  });
  
  describe(c.LOG_WORKOUT_EDIT, () => {
    it('should edit a workout', () => {
      // when
      const newState = logWorkoutReducer(undefined, actions.logWorkoutEdit(ewoloTestUtil.mock.savedWorkout));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          id: 21,
          componentMounted: true,
          notes: 'bla',
          date: '2017-06-24',
          exercises: [
            {
              id: 92,
              name: 'Bench Press',
              reps: 8,
              sets: 1,
              weight: 88,
              tempo: '101',
              rest: 0,
              workoutOrder: 1,
              superSetIndex: 1,
              setIndex: 1,
              showProperties: true,
              showAdvanced: false
            }, {
              id: 93,
              name: 'Bent Over Barbell Rows',
              reps: 8,
              sets: 1,
              weight: 88,
              tempo: '101',
              rest: 60,
              workoutOrder: 2,
              superSetIndex: 2,
              setIndex: 1,
              showProperties: true,
              showAdvanced: false
            }, {
              id: 100,
              name: 'Incline Barbell Bench Press',
              reps: 8,
              sets: 1,
              weight: 66,
              tempo: '101',
              rest: 60,
              workoutOrder: 3,
              setIndex: 1,
              superSetIndex: 0,
              showProperties: true,
              showAdvanced: false
            }, {
              id: 101,
              name: 'Incline Barbell Bench Press',
              reps: 6,
              sets: 1,
              weight: 66,
              tempo: '101',
              rest: 60,
              workoutOrder: 4,
              setIndex: 2,
              superSetIndex: 0,
              showProperties: true,
              showAdvanced: false
            }
          ],
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
    const today = ewoloUtil.getTodaysDate();

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
