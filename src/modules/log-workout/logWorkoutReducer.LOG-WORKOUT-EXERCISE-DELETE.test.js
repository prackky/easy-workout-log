import { expect } from 'chai';
import moment from 'moment';

import logWorkoutReducer from './logWorkoutReducer';
import actions, { c } from './logWorkoutActions';

describe('logWorkoutReducer', () => {
  describe(c.LOG_WORKOUT_EXERCISE_DELETE, () => {
    it('should remove the specified exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
      }, actions.logWorkoutExerciseDelete(1));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [
            { name: 'a', setIndex: 1, superSetIndex: 0 },
            { name: 'c', setIndex: 1, superSetIndex: 0 }
          ]
        });
    });

    it('should remove the first exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
      }, actions.logWorkoutExerciseDelete(0));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [
            { name: 'b', setIndex: 1, superSetIndex: 0 },
            { name: 'c', setIndex: 1, superSetIndex: 0 }
          ]
        });
    });

    it('should remove the last exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b' }, { name: 'c' }]
      }, actions.logWorkoutExerciseDelete(2));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [
            { name: 'a', setIndex: 1, superSetIndex: 0 },
            { name: 'b', setIndex: 1, superSetIndex: 0 }
          ]
        });
    });

    describe('superSetIndex', () => {
      it('should set superSetIndex when deleting the first superset exercise', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [
            { name: 'a', rest: '0', setIndex: 1, superSetIndex: 1 },
            { name: 'b', rest: '60', setIndex: 1, superSetIndex: 2 }
          ]
        }, actions.logWorkoutExerciseDelete(0));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'b', rest: '60', setIndex: 1, superSetIndex: 0 }
            ]
          });
      });

      it('should set superSetIndex when deleting the second superset exercise', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [
            { name: 'a', rest: '0', setIndex: 1, superSetIndex: 1 },
            { name: 'b', rest: '0', setIndex: 1, superSetIndex: 2 },
            { name: 'c', rest: '60', setIndex: 1, superSetIndex: 3 }
          ]
        }, actions.logWorkoutExerciseDelete(1));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'a', rest: '0', setIndex: 1, superSetIndex: 1 },
              { name: 'c', rest: '60', setIndex: 1, superSetIndex: 2 }
            ]
          });
      });
    });

    describe('setIndex', () => {
      it('should set the correct setIndex when deleting the second exercise', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [{ name: 'a', id: 'first', setIndex: 1 }, { name: 'a', id: 'second', setIndex: 2 }, { name: 'a', id: 'third', setIndex: 3 }]
        }, actions.logWorkoutExerciseDelete(1));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'a', id: 'first', setIndex: 1, superSetIndex: 0 },
              { name: 'a', id: 'third', setIndex: 2, superSetIndex: 0 }
          ]
          });
      });

      it('should set the correct setIndex when deleting the first exercise', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [{ name: 'a', id: 'first', setIndex: 1 }, { name: 'a', id: 'second', setIndex: 2 }, { name: 'a', id: 'third', setIndex: 3 }]
        }, actions.logWorkoutExerciseDelete(0));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'a', id: 'second', setIndex: 1, superSetIndex: 0 },
              { name: 'a', id: 'third', setIndex: 2, superSetIndex: 0 }
          ]
          });
      });

      it('should set the correct setIndex when deleting the first exercise of the second set', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [{ name: 'a', id: 'first', setIndex: 1 }, { name: 'a', id: 'second', setIndex: 2 }, { name: 'a', id: 'third', setIndex: 3 }, { name: 'b', id: 'xxx', setIndex: 1 }, { name: 'b', id: 'yyy', setIndex: 2 }, { name: 'b', id: 'zzz', setIndex: 3 }]
        }, actions.logWorkoutExerciseDelete(3));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'a', id: 'first', setIndex: 1, superSetIndex: 0 },
              { name: 'a', id: 'second', setIndex: 2, superSetIndex: 0 },
              { name: 'a', id: 'third', setIndex: 3, superSetIndex: 0 },
              { name: 'b', id: 'yyy', setIndex: 1, superSetIndex: 0 },
              { name: 'b', id: 'zzz', setIndex: 2, superSetIndex: 0 }
          ]
          });
      });

      it('should set the correct setIndex when deleting the second exercise of the second set', () => {
        // when
        const newState = logWorkoutReducer({
          exercises: [{ name: 'a', id: 'first', setIndex: 1 }, { name: 'a', id: 'second', setIndex: 2 }, { name: 'a', id: 'third', setIndex: 3 }, { name: 'b', id: 'xxx', setIndex: 1 }, { name: 'b', id: 'yyy', setIndex: 2 }, { name: 'b', id: 'zzz', setIndex: 3 }]
        }, actions.logWorkoutExerciseDelete(4));

        // then
        expect(newState)
          .to
          .deep
          .equal({
            exercises: [
              { name: 'a', id: 'first', setIndex: 1, superSetIndex: 0 },
              { name: 'a', id: 'second', setIndex: 2, superSetIndex: 0 },
              { name: 'a', id: 'third', setIndex: 3, superSetIndex: 0 },
              { name: 'b', id: 'xxx', setIndex: 1, superSetIndex: 0 },
              { name: 'b', id: 'zzz', setIndex: 2, superSetIndex: 0 }
          ]
          });
      });
    });
  });

});
