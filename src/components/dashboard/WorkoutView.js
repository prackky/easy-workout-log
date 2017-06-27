import React from 'react';

import './WorkoutView.css';

const orderExercises = (exercises) => {
  const result = [];

  exercises.sort((a, b) => {
    return a.workoutOrder - b.workoutOrder;
  });

  let exerciseName = null;
  exercises.forEach((exercise, i) => {
    if (exerciseName !== exercise.name) {
      exerciseName = exercise.name;
      result.push({name: exerciseName, setHeader: true});
    }
    result.push(exercise);
  });
  return result;
};

const WorkoutView = (props) => {

  const {workout, showWorkoutDetails} = props;
  const exercises = orderExercises(workout.exercises);

  const toggleViewWorkoutDetails = (event) => {
    event.preventDefault();
    props.doToggleViewWorkoutDetails(workout.id, !showWorkoutDetails);
  }

  const handleWorkoutDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();
    props.doDeleteUserWorkoutThunk(workout.id);
  }

  const renderExercises = () => {
    if (exercises.length === 0) {
      return (
        <div className="column col-12 row">
          <i>No exercises logged</i>
        </div>
      )
    }

    return exercises.map((exercise, index) => {
      if (exercise.setHeader) {
        return (
          <div
            key={index + '-' + exercise.name}
            className="column col-12 workout-exercise row">
            {exercise.name}
          </div>
        );
      }

      const showTempo = exercise.tempo !== '101';
      const showRest = exercise.rest !== 60;
      const showDivider = showTempo && showRest;

      return (
        <div className="column col-12 row" key={exercise.id}>
          <div className="columns">
            <div className="column col-6 text-right row">{exercise.reps} {exercise.weight > 0
                ? 'x ' + exercise.weight
                : ''}</div>
            <div className="column col-6 row">{showTempo
                ? exercise.tempo
                : ''} {showDivider
                ? ' / '
                : ''}
              {showRest
                ? exercise.rest
                : ''}</div>
          </div>
        </div>
      );
    });

  }

  return (
    <div className="accordion-item">
      <label
        className="accordion-header hand workout-panel"
        onClick={toggleViewWorkoutDetails}>
        <div className="columns">
          <div className="columns col-xs-5 col-3 centered">
            {workout.date}
          </div>
          <div className="columns col-xs-5 col-8 centered workout-panel-notes">{workout.notes}</div>
          <div className="columns col-xs-2 col-1 centered text-right">
            {/*
            <button
              className="btn btn-action btn-lg circle btn-exercise-action tooltip"
              data-tooltip="Delete workout"
              type="button"
              onClick={handleWorkoutDelete}>
              <i className="icon icon-delete"></i>
            </button>
            */}

            <button
              className="btn btn-action btn-lg circle btn-exercise-action"
              type="button"
              onClick={handleWorkoutDelete}>
              <i className="icon icon-delete"></i>
            </button>
          </div>
        </div>
      </label>
      <div
        className={props.showWorkoutDetails
        ? "accordion-body-show"
        : "accordion-body"}>
        <div className="columns workout-details">
          {renderExercises()}
        </div>
      </div>
    </div>
  );
}

export default WorkoutView;
