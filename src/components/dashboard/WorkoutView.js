import React from 'react';
// import moment from 'moment';

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

  const renderExercises = () => {
    let exerciseName = null;

    return exercises.map((exercise, index) => {
      if (exercise.setHeader) {
        return (
          <div key={index + '-' + exercise.name} className="column col-12 workout-exercise row">
            {exercise.name}
          </div>
        );

        /*
        return (
          <th key={index}>
            <td colSpan="2">{exercise.name}</td>
          </th>
        );
        */
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

      /*
      return (
        <tr key={index}>
          <td className="text-right">{exercise.reps} {exercise.weight > 0
              ? 'x ' + exercise.weight
              : ''}</td>
          <td>{exercise.tempo === '101'
              ? ''
              : exercise.tempo}
            / {exercise.rest === 60
              ? ''
              : exercise.rest}</td>
        </tr>
      );
      */
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
            {/* Space for stuff */}
          </div>
        </div>
      </label>
      <div
        className={props.showWorkoutDetails
        ? "accordion-body-show"
        : "accordion-body"}>
        {/*
        <table className="table workout-details">
          <tbody>
            {renderExercises()}
          </tbody>
        </table>
        */}
        <div className="columns workout-details">
          {renderExercises()}
        </div>
      </div>
    </div>
  );
}

export default WorkoutView;
