import { expect } from 'chai';
import moment from 'moment';

import logWorkoutReducer from './logWorkoutReducer';
import actions from '../actions/logWorkoutActions';

describe('logWorkoutReducer', () => {
  describe('LOG-WORKOUT-EXERCISE-SET-DATA', () => {
    it('should update the specified exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b', reps: '1' }, { name: 'c' }]
      }, actions.logWorkoutExerciseSetData(1, { name: 'changed', snoop: 'dawg', reps: '1' }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a', setIndex: 1 }, { name: 'changed', snoop: 'dawg', reps: '1', nameFormHint: '', repsFormHint: '', setIndex: 1 }, { name: 'c', setIndex: 1 }]
        });
    });

    it('should set the nameFormHint for an empty name', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'b', reps: '1' }, { name: 'c' }]
      }, actions.logWorkoutExerciseSetData(1, { name: '', reps: '1' }));

      // then
      // console.log(newState.logWorkout.exercises[1]);
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a', setIndex: 1 }, { name: '', nameFormHint: 'Required.', repsFormHint: '', reps: '1', setIndex: 1 }, { name: 'c', setIndex: 1 }]
        });
    });

    it('should set the correct setIndex when updating the first exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'a', reps: '1' }, { name: 'a' }]
      }, actions.logWorkoutExerciseSetData(0, { name: 'changed', snoop: 'dawg', reps: '2' }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'changed', reps: '2', snoop: 'dawg', nameFormHint: '', repsFormHint: '', setIndex: 1 }, { name: 'a', reps: '1', setIndex: 1 }, { name: 'a', setIndex: 2 }]
        });
    });

    it('should set the correct setIndex when updating the last exercise', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'a', reps: '1' }, { name: 'a' }]
      }, actions.logWorkoutExerciseSetData(2, { name: 'changed', reps: '2' }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a', setIndex: 1 }, { name: 'a', reps: '1', setIndex: 2 }, { name: 'changed', reps: '2', setIndex: 1, nameFormHint: '', repsFormHint: '' }]
        });
    });

    it('should set the correct setIndex when updating the last exercise with a specified setIndex', () => {
      // when
      const newState = logWorkoutReducer({
        exercises: [{ name: 'a' }, { name: 'a', reps: '1' }, { name: 'a' }]
      }, actions.logWorkoutExerciseSetData(2, { name: 'changed', reps: '2', setIndex: 56 }));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          exercises: [{ name: 'a', setIndex: 1 }, { name: 'a', reps: '1', setIndex: 2 }, { name: 'changed', reps: '2', setIndex: 1, nameFormHint: '', repsFormHint: '' }]
        });
    });

  });

});
