import { expect } from 'chai';
import ExerciseService from './ExerciseService';

describe('ExerciseService', () => {
  it('should load the exercises', () => {
    // when
    const exerciseService = new ExerciseService();

    // then
    const exercises = Array.from(exerciseService.exercises);
    expect(exercises.length).to.be.above(90);
    expect(exercises[0]).to.equal('Flat Barbell Bench Press');
  });

});
