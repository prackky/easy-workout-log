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
      }, actions.logWorkoutExercise({}));

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
              setIndex: 1,
              superSetIndex: 0
            }
          ]
        });
    });

    it('should add an exercise with given properties', () => {
      // when
      const newState = logWorkoutReducer({
        type: 'weight',
        exercises: []
      }, actions.logWorkoutExercise({ name: 'existing', reps: '24', weight: '200', sets: '2', tempo: '202', rest: '200', showAdvanced: true }));

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
              setIndex: 1,
              superSetIndex: 0
            }
          ]
        });
    });

    describe('setIndex', () => {
      it('should set the correct setIndex when adding a second exercise', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [{ name: '2', setIndex: 1 }]
        }, actions.logWorkoutExercise({ name: '2' }));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [{ name: '2', setIndex: 1, superSetIndex: 0 }, {
              name: '2',
              reps: '8',
              weight: '100',
              sets: '1',
              tempo: '101',
              rest: '60',
              showAdvanced: false,
              showProperties: true,
              setIndex: 2,
              superSetIndex: 0
          }]
          });
      });

      it('should set the correct setIndex when adding a third exercise', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [{ name: '3', setIndex: 1 }, { name: '3', setIndex: 2 }]
        }, actions.logWorkoutExercise({ name: '3' }));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: '3', setIndex: 1, superSetIndex: 0 },
              { name: '3', setIndex: 2, superSetIndex: 0 },
              {
                name: '3',
                reps: '8',
                weight: '100',
                sets: '1',
                tempo: '101',
                rest: '60',
                showAdvanced: false,
                showProperties: true,
                setIndex: 3,
                superSetIndex: 0
              }
            ]
          });
      });

      it('should set the correct setIndex when adding a new exercise after a set', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [
            { name: 'a', setIndex: 1 },
            { name: 'a', setIndex: 2 }
          ]
        }, actions.logWorkoutExercise({ name: 'b' }));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'a', setIndex: 1, superSetIndex: 0 },
              { name: 'a', setIndex: 2, superSetIndex: 0 },
              {
                name: 'b',
                reps: '8',
                weight: '100',
                sets: '1',
                tempo: '101',
                rest: '60',
                showAdvanced: false,
                showProperties: true,
                setIndex: 1,
                superSetIndex: 0
              }
            ]
          });
      });
    });

    describe('superSetIndex', () => {
      it('should set superSetIndex when adding the first set of a superset', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: []
        }, actions.logWorkoutExercise({ name: 'super', reps: '8', weight: '100', sets: '1', tempo: '101', rest: '0', showAdvanced: true }));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [{
              name: 'super',
              reps: '8',
              weight: '100',
              sets: '1',
              tempo: '101',
              rest: '0',
              showAdvanced: true,
              showProperties: true,
              setIndex: 1,
              superSetIndex: 1
            }]
          });
      });

      it('should set superSetIndex when adding the third set of a superset', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [
            { name: 'super1', rest: '0' },
            { name: 'super2', rest: '0' }
          ]
        }, actions.logWorkoutExercise({ name: 'super3' }));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'super1', rest: '0', setIndex: 1, superSetIndex: 1 },
              { name: 'super2', rest: '0', setIndex: 1, superSetIndex: 2 },
              {
                name: 'super3',
                reps: '8',
                weight: '100',
                sets: '1',
                tempo: '101',
                rest: '60',
                showAdvanced: false,
                showProperties: true,
                setIndex: 1,
                superSetIndex: 3
              },
            ]
          });
      });

      it('should set superSetIndex when wrapping up a superset', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [
            { name: 'super1', rest: '0' },
            { name: 'super2', rest: '60' }
          ]
        }, actions.logWorkoutExercise({ name: 'normal' }));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'super1', rest: '0', setIndex: 1, superSetIndex: 1 },
              { name: 'super2', rest: '60', setIndex: 1, superSetIndex: 2 },
              {
                name: 'normal',
                reps: '8',
                weight: '100',
                sets: '1',
                tempo: '101',
                rest: '60',
                showAdvanced: false,
                showProperties: true,
                setIndex: 1,
                superSetIndex: 0
              },
            ]
          });
      });

    });

  });

});
