import React from 'react';
import {connect} from 'react-redux';

import userActions from '../../core/actions/userActions';

import './log-exercise.css';

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkoutExerciseDelete: (index) => {
      dispatch(userActions.logWorkoutExerciseDelete(index));
    },
    doLogWorkoutExerciseSetData: (index, exercise) => {
      dispatch(userActions.logWorkoutExerciseSetData(index, exercise));
    }
  };
};

const LogExercise = (props) => {

  const handleExerciseDelete = (event) => {
    event.preventDefault();
    props.doLogWorkoutExerciseDelete(props.index);
  };

  const handleChange = (event) => {
    const propertyName = event
      .target
      .getAttribute('property');
    const exercise = props.exercise;
    exercise[propertyName] = event.target.value;

    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleShowAdvanced = () => {
    const exercise = {
      ...props.exercise
    };
    exercise.showAdvanced = true;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handlePopover = (event) => {
    event.preventDefault();
  };

  const handleExercisePropertiesToggle = (event) => {
    // console.log('wtf');
    const exercise = {
      ...props.exercise
    };
    exercise.showProperties = !exercise.showProperties;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const renderDeleteButton = () => {
    return (
      <button
        className="btn btn-action btn-lg circle btn-exercise-action tooltip"
        data-tooltip="Delete exercise"
        onClick={handleExerciseDelete}>
        <i className="icon icon-delete"></i>
      </button>
    );
  };

  const renderPropertyFormHint = (hint) => {
    if (!hint) {
      return;
    }

    return (
      <div className={"form-group form-input-hint"}>
        <div className="col-3"></div>
        <div className="col-9">
          {hint}
        </div>
      </div>
    )
  };

  const renderExerciseNameLabel = () => {
    return (
      <label className="form-label tooltip" data-tooltip="Toggle properties">
        <a onClick={handleExercisePropertiesToggle}>Name</a>
      </label>
    );
  };

  const renderExerciseProperties = () => {
    if (!props.exercise.showProperties) {
      return;
    }

    return (
      <div className="fade-in">
        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Reps</label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              min="0"
              max="1000"
              property="reps"
              value={props.exercise.reps}
              onChange={handleChange}/>
          </div>
        </div>

        {renderPropertyFormHint(props.exercise.repsFormHint)}

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Weight</label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              property="weight"
              min="0"
              max="1000"
              value={props.exercise.weight}
              onChange={handleChange}/>
          </div>
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Sets</label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              min="0"
              max="1000"
              property="sets"
              value={props.exercise.sets}
              onChange={handleChange}/>
          </div>
        </div>

        {renderAdvanced()}
      </div>
    );
  }

  const renderAdvanced = () => {
    if (!props.exercise.showAdvanced) {
      return (
        <div className="form-group">
          <div className="col-12">
            <button
              className="btn btn-action btn-lg circle tooltip"
              data-tooltip="Advanced fields"
              onClick={handleShowAdvanced}>
              <i className="icon icon-more-horiz"></i>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="fade-in">
        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Tempo</label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              property="tempo"
              min="0"
              max="999"
              value={props.exercise.tempo}
              onChange={handleChange}/>
          </div>
          <div className="col-5">
            <div className="popover popover-top">
              <button
                className="btn btn-action btn-lg circle btn-exercise-action"
                onClick={handlePopover}>
                <i className="icon icon-message"></i>
              </button>
              <div className="popover-container">
                <div className="card">
                  <div className="card-body">
                    The speed of the exercise. For e.g. 101 means 1 second eccentric (negative), 0
                    second mid-point and 1 second concentric (positive).
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">Rest</label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              min="0"
              max="99999"
              property="rest"
              value={props.exercise.rest}
              onChange={handleChange}/>
          </div>
          <div className="col-5">
            <div className="popover popover-top">
              <button
                className="btn btn-action btn-lg circle btn-exercise-action"
                onClick={handlePopover}>
                <i className="icon icon-message"></i>
              </button>
              <div className="popover-container">
                <div className="card">
                  <div className="card-body">
                    The rest in seconds between sets.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="fade-in">
      <div className="divider"></div>

      <div className="exercise-entry">
        <div className="form-group">
          <div className="col-3">
            {renderExerciseNameLabel()}
          </div>
          <div className="col-7">
            <input
              className="form-input input-lg"
              type="text"
              placeholder="e.g. Squats"
              value={props.exercise.name}
              property="name"
              onChange={handleChange}/>
          </div>
          <div className="col-2 text-center">
            {renderDeleteButton()}
          </div>
        </div>

        {renderPropertyFormHint(props.exercise.nameFormHint)}

        {renderExerciseProperties()}
      </div>
    </div>
  );
};

export default connect(null, mapDispatchToProps)(LogExercise);
