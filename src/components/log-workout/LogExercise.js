import React from 'react';
import PropTypes from 'prop-types';

import ewoloUtil from '../../common/ewoloUtil';

import {EwoloFormHintSplit} from '../generic/EwoloFormHint';
import AutoComplete from '../generic/AutoComplete';

const LogExercise = (props) => {

  const handleUnitSelectionChange = (event) => {
    const exercise = props.exercise;
    exercise.units = parseInt(event.target.value, 10);
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  }

  const handleExerciseDelete = (event) => {
    event
      .currentTarget
      .blur(); // hide the tooltip
    props.doLogWorkoutExerciseDelete(props.index);
  };

  const handleExerciseMarkDone = (event) => {
    event
      .currentTarget
      .blur();
    const exercise = props.exercise;
    exercise.isDone = true;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleExerciseMarkActive = (event) => {
    event
      .currentTarget
      .blur();
    const exercise = props.exercise;
    exercise.isDone = false;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleChange = (event) => {
    const propertyName = event
      .target
      .getAttribute('property');
    const exercise = props.exercise;
    exercise[propertyName] = event.target.value;

    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleNameAutoCompleteChange = (value) => {
    const exercise = props.exercise;
    exercise.name = value;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  }

  const handleClearName = (event) => {
    const exercise = props.exercise;
    exercise.name = '';
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleShowAdvanced = (event) => {
    event
      .currentTarget
      .blur(); // hide the tooltip

    const exercise = {
      ...props.exercise
    };
    exercise.showAdvanced = true;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleHideAdvanced = (event) => {
    event
      .currentTarget
      .blur(); // hide the tooltip

    const exercise = {
      ...props.exercise
    };
    exercise.showAdvanced = false;
    props.doLogWorkoutExerciseSetData(props.index, exercise);
  };

  const handleSetShowTempoHelpClick = (event) => {
    props.doLogWorkoutSetShowTempoHelp(true);
  };

  const handleSetShowRestHelpClick = (event) => {
    props.doLogWorkoutSetShowRestHelp(true);
  };

  const handleSetShowWeightHelpClick = (event) => {
    props.doLogWorkoutSetShowWeightHelp(true);
  };

  const renderExerciseReadOnly = () => {
    const renderedExerciseOperations = renderExerciseOperations();
    const renderedSetIndicator = renderSetIndicator();
    const {
      name,
      reps,
      weight,
      units,
      tempo,
      rest
    } = props.exercise;

    return (
      <div className="exercise-entry">
        <div className="columns">
          {renderedSetIndicator}
          <div className="column col-11">
            <div className="columns">
              <div className="column col-12">
                {name}
              </div>
              <div className="column col-12">
                {reps}
                &nbsp;reps {weight
                  ? ' @ ' + weight + ' ' + ewoloUtil.unitsToText(units)
                  : ''}
                {tempo && tempo !== '101'
                  ? ' / ' + tempo
                  : ''}
                {rest && rest !== '60'
                  ? ' / ' + rest + ' secs'
                  : ''}
              </div>
              {renderedExerciseOperations}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderExerciseEditable = () => {
    return (
      <div className="exercise-entry">

        <div className="form-group">
          <div className="col-3">
            <label className="form-label">
              Name
            </label>
          </div>
          <div className="col-7">
            {/*
          <div className="input-group">
            <AutoComplete
              placeholder="e.g. Squats"
              autoFocus={true}
              // name="exerciseName"
              items={props.exerciseNames}
              input={props.exercise.name}
              handleChange={handleNameAutoCompleteChange}/>

            <button className="btn btn-primary input-group-btn">Clear</button>
          </div>
          */}
            <AutoComplete placeholder="e.g. Squats" autoFocus={true} // name="exerciseName"
              items={props.exerciseNames} input={props.exercise.name} handleChange={handleNameAutoCompleteChange}/>

          </div>
          <div className="col-2 text-center">
            <button
              className="btn btn-action tooltip"
              data-tooltip="Clear"
              type="button"
              onClick={handleClearName}>
              <i className="icon icon-refresh"></i>
            </button>
          </div>
        </div>

        <EwoloFormHintSplit formHint={props.exercise.nameFormHint}/> {renderExerciseProperties()}
      </div>
    );
  }

  const renderSetIndicator = () => {
    return (
      <div
        className="divider-vert"
        data-content={'#' + (props.exercise.superSetIndex > 0
        ? props.exercise.setIndex + '.' + props.exercise.superSetIndex
        : props.exercise.setIndex)}></div>
    );
  }

  const renderExerciseOperations = () => {
    return (
      <div className="form-group">
        <div className="col-12 exercise-operations">
          {renderAdvancedPropertiesButton()}
          <button
            className="btn btn-action btn-lg circle btn-exercise-action tooltip"
            data-tooltip="Delete exercise"
            type="button"
            onClick={handleExerciseDelete}>
            <i className="icon icon-delete"></i>
          </button>
          {renderExerciseStatusOperation()}
        </div>
      </div>
    );
  }

  const renderExerciseStatusOperation = () => {
    if (props.exercise.isDone) {
      return (
        <button
          className="btn btn-action btn-lg circle btn-exercise-action tooltip"
          data-tooltip="Edit exercise"
          type="button"
          onClick={handleExerciseMarkActive}>
          <i className="icon icon-edit"></i>
        </button>
      );
    }

    return (
      <button
        className="btn btn-action btn-lg circle btn-exercise-action tooltip"
        data-tooltip="Mark exercise done"
        type="button"
        onClick={handleExerciseMarkDone}>
        <i className="icon icon-check"></i>
      </button>
    );
  }

  const renderAdvancedPropertiesButton = () => {
    if (props.exercise.isDone) {
      return null;
    }

    if (props.exercise.showAdvanced) {
      return (
        <button
          className="btn btn-action btn-lg circle tooltip"
          data-tooltip="Hide advanced"
          type="button"
          onClick={handleHideAdvanced}>
          <i className="icon icon-arrow-up"></i>
        </button>
      )
    }

    return (
      <button
        className="btn btn-action btn-lg circle tooltip"
        data-tooltip="Show advanced"
        type="button"
        onClick={handleShowAdvanced}>
        <i className="icon icon-arrow-down"></i>
      </button>
    )
  }

  const renderExerciseProperties = () => {

    if (!props.exercise.showProperties) { // this is unused for the moment
      return renderExercisePropertiesShortForm();
    }

    const renderedAdvancedProperties = renderAdvanced();
    const renderedExerciseOperations = renderExerciseOperations();
    const renderedDivider = renderSetIndicator();

    return (
      <div className="fade-in exercise-entry-details">
        <div className="columns">
          {renderedDivider}
          <div className="column col-11">

            <div className="form-group">
              <div className="col-4">
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

            <EwoloFormHintSplit formHint={props.exercise.repsFormHint}/>

            <div className="form-group">
              <div className="col-4">
                <label className="form-label">
                  <a onClick={handleSetShowWeightHelpClick}>
                    Weight</a>
                </label>
              </div>
              <div className="col-8">
                <div className="input-group">
                  <input
                    className="form-input input-lg"
                    type="number"
                    property="weight"
                    min="0"
                    max="1000"
                    value={props.exercise.weight !== null
                    ? props.exercise.weight
                    : ''}
                    onChange={handleChange}/>

                  <select
                    className="form-select"
                    value={props.exercise.units}
                    onChange={handleUnitSelectionChange}>
                    <option value="1">lbs</option>
                    <option value="2">kgs</option>
                  </select>
                </div>
              </div>
            </div>

            {renderedAdvancedProperties}
            {renderedExerciseOperations}

          </div>
        </div>
      </div>
    )
  };

  const renderExercisePropertiesShortForm = () => {
    const {reps, weight, tempo, rest} = props.exercise;

    return (
      <div className="exercise-entry-details">
        {/*{sets && sets !== '1' ? sets + ' x ' : ''}*/}
        {reps}
        reps {weight
          ? ' @ ' + weight + ' lbs'
          : ''}
        {tempo && tempo !== '101'
          ? ' / ' + tempo
          : ''}
        {rest && rest !== '60'
          ? ' / ' + rest + ' secs'
          : ''}
      </div>
    )
  };

  const renderAdvanced = () => {
    if (!props.exercise.showAdvanced) {
      return null;
    }

    return (
      <div className="fade-in margin-bottom-1rem">
        <div className="form-group">
          <div className="col-4">
            <label className="form-label">
              <a onClick={handleSetShowTempoHelpClick}>Tempo</a>
            </label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              property="tempo"
              min="0"
              max="999"
              value={props.exercise.tempo !== null
              ? props.exercise.tempo
              : ''}
              onChange={handleChange}/>
          </div>

        </div>

        <div className="form-group">
          <div className="col-4">
            <label className="form-label">
              <a onClick={handleSetShowRestHelpClick}>Rest</a>
            </label>
          </div>
          <div className="col-4">
            <input
              className="form-input input-lg"
              type="number"
              min="0"
              max="99999"
              property="rest"
              value={props.exercise.rest !== null
              ? props.exercise.rest
              : ''}
              onChange={handleChange}/>
          </div>
        </div>
      </div>
    );
  }

  const rendered = props.exercise.isDone
    ? renderExerciseReadOnly()
    : renderExerciseEditable();

  return (
    <div className="fade-in">
      <div className="divider"></div>
      {rendered}
    </div>
  );

};

LogExercise.propTypes = {
  exerciseNames: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired,
  index: PropTypes.number.isRequired,
  isLast: PropTypes.bool.isRequired,
  exercise: PropTypes.object.isRequired,
  doLogWorkoutExerciseDelete: PropTypes.func.isRequired,
  doLogWorkoutExerciseSetData: PropTypes.func.isRequired,
  doLogWorkoutSetShowTempoHelp: PropTypes.func.isRequired,
  doLogWorkoutSetShowRestHelp: PropTypes.func.isRequired,
  doLogWorkoutSetShowWeightHelp: PropTypes.func.isRequired
};

export default LogExercise;
