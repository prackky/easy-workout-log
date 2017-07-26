import React from 'react';

import './WorkoutView.css';

import Modal from '../generic/Modal';
import calculateSuperSetIndexes from '../../services/superSetService';

import ewoloUtil from '../../common/ewoloUtil';

const orderExercises = (exercises) => {
  const result = [];

  exercises.sort((a, b) => {
    return a.workoutOrder - b.workoutOrder;
  });

  let previous = {
    name: null
  };

  exercises.forEach((exercise, i) => {
    if (previous.name !== exercise.name) {
      previous = exercise;

      result.push({
        name: previous.name,
        setHeader: true,
        isSuperSet: previous.superSetIndex > 1
          ? true
          : false
      });
    }
    result.push(exercise);
  });

  return result;
};

class WorkoutView extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      showDeleteConfirmModal: false
    };
  }

  toggleViewWorkoutDetails = (event) => {
    event.preventDefault();
    this
      .props
      .doToggleViewWorkoutDetails(this.props.workout.id, !(this.props.showWorkoutDetails));
  }

  handleModalWorkoutDeleteExecute = () => {
    this
      .props
      .doDeleteUserWorkoutThunk(this.props.workout.id, this.props.workout.date);
  }

  handleModalWorkoutDeleteCancel = () => {
    const state = this.state;
    this.setState({
      ...state,
      showDeleteConfirmModal: false
    });
  }

  handleWorkoutDelete = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const state = this.state;
    this.setState({
      ...state,
      showDeleteConfirmModal: true
    });
  }

  handleWorkoutCopy = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this
      .props
      .doCopyWorkoutThunk(this.props.workout);
  }

  handleWorkoutEdit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this
      .props
      .doEditWorkoutThunk(this.props.workout);
  }

  handleWorkoutMenuClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  renderExercises = () => {
    let exercises = calculateSuperSetIndexes(this.props.workout.exercises);
    exercises = orderExercises(exercises);

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
            {exercise.isSuperSet
              ? '+'
              : ''}
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
                ? 'x ' + exercise.weight + (exercise.units !== this.props.defaultUnits ? ' ' + ewoloUtil.unitsToText(exercise.units) : '') 
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

  render() {
    const noTransitionCss = ewoloUtil.isMobileDevice() ? ' no-transition ' : '';

    return (
      <div className="accordion-item">
        <Modal
          doModalActionCancel={this.handleModalWorkoutDeleteCancel}
          doModalActionExecute={this.handleModalWorkoutDeleteExecute}
          modalActionExecute="Delete"
          showModal={this.state.showDeleteConfirmModal}
          size="sm"
          title="Delete workout"
          content={['Are you sure you want to delete this workout?']}/>

        <label
          className="accordion-header hand workout-panel"
          onClick={this.toggleViewWorkoutDetails}>
          <div className="columns">
            <div className="columns col-xs-5 col-3 centered">
              {this.props.workout.date}
            </div>
            <div className="columns col-xs-5 col-8 centered workout-panel-notes">{this.props.workout.notes}</div>
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

              <div className="dropdown dropdown-right">
                <button
                  className="btn btn-action btn-lg circle btn-exercise-action dropdown-toggle"
                  type="button"
                  onClick={this.handleWorkoutMenuClick}>
                  <i className="icon icon-menu"></i>
                </button>

                <ul className="menu">
                  <li className="menu-item">
                    <a href="#/workout-copy" onClick={this.handleWorkoutEdit}>
                      <i className="fa fa-pencil" aria-hidden="true"></i>Edit workout {this.props.workout.date}</a>
                  </li>
                  <li className="menu-item">
                    <a href="#/workout-copy" onClick={this.handleWorkoutCopy}>
                      <i className="fa fa-clone" aria-hidden="true"></i>Copy workout {this.props.workout.date}</a>
                  </li>
                  <li className="menu-item">
                    <a href="#/workout-delete" onClick={this.handleWorkoutDelete}>
                      <i className="fa fa-trash" aria-hidden="true"></i>Delete workout {this.props.workout.date}</a>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </label>
        <div
          className={this.props.showWorkoutDetails
          ? "accordion-body-show" + noTransitionCss
          : "accordion-body" + noTransitionCss}>
          <div className="columns workout-details">
            {this.renderExercises()}
          </div>
        </div>
      </div>
    );
  }
}

export default WorkoutView;
