import { expect } from 'chai';
import moment from 'moment';

import logWorkoutReducer from './logWorkoutReducer';
import actions, { c } from './logWorkoutActions';

describe('logWorkoutReducer', () => {
  describe(c.LOG_WORKOUT_EXERCISE, () => {
    it('should add an exercise', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: []
      }, actions.logWorkoutExercise());

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
              showProperties: true,
              setIndex: 1
            }
          ]
        });
    });

    it('should add an exercise for with given properties', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: []
      }, actions.logWorkoutExercise('existing', '24', '200', '2', '202', '200', true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          type: 'weight',
          exercises: [
            {
              name: 'existing',
              reps: '24',
              weight: '200',
              sets: '2',
              tempo: '202',
              rest: '200',
              showAdvanced: true,
              showProperties: true,
              setIndex: 1
            }
          ]
        });
    });

    it('should set the correct setIndex when adding a second exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: '2', setIndex: 1 }]
      }, actions.logWorkoutExercise('2'));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: '2', setIndex: 1 }, {
            name: '2',
            reps: '8',
            weight: '100',
            sets: '1',
            tempo: '101',
            rest: '60',
            showAdvanced: false,
            showProperties: true,
            setIndex: 2
          }]
        });
    });

    it('should set the correct setIndex when adding a third exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: '3', setIndex: 1 }, { name: '3', setIndex: 2 }]
      }, actions.logWorkoutExercise('3'));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: '3', setIndex: 1 }, { name: '3', setIndex: 2 }, {
            name: '3',
            reps: '8',
            weight: '100',
            sets: '1',
            tempo: '101',
            rest: '60',
            showAdvanced: false,
            showProperties: true,
            setIndex: 3
          }]
        });
    });

    it('should set the correct setIndex when adding a new exercise after a set', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a', setIndex: 1 }, { name: 'a', setIndex: 2 }]
      }, actions.logWorkoutExercise('b'));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a', setIndex: 1 }, { name: 'a', setIndex: 2 }, {
            name: 'b',
            reps: '8',
            weight: '100',
            sets: '1',
            tempo: '101',
            rest: '60',
            showAdvanced: false,
            showProperties: true,
            setIndex: 1
          }]
        });
    });

  });

});
