import React, {Component} from 'react';
import {connect} from 'react-redux';

import './log-workout.css';

import UserNotificationBar from '../notification/UserNotificationBar';
import LogExercise from './LogExercise';

import logWorkoutActions from '../../actions/logWorkoutActions';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(logWorkoutActions.logWorkout());
    },
    doLogWorkoutExercise: () => {
      dispatch(logWorkoutActions.logWorkoutExercise());
    },
    doLogWorkoutSetData: (date, notes) => {
      dispatch(logWorkoutActions.logWorkoutSetData(date, notes));
    },
    doLogWorkoutSave: () => {
      dispatch(logWorkoutActions.logWorkoutSave());
    },
    doLogWorkoutExerciseDelete: (index) => {
      dispatch(logWorkoutActions.logWorkoutExerciseDelete(index));
    },
    doLogWorkoutExerciseSetData: (index, exercise) => {
      dispatch(logWorkoutActions.logWorkoutExerciseSetData(index, exercise));
    }
  };
};

class LogWorkout extends Component {

  componentDidMount() {
    if (!this.props.logWorkout.componentMounted) {
      this
        .props
        .doLogWorkout();
      this
        .props
        .doLogWorkoutExercise();
    }
  }

  renderExercises() {
    return this
      .props
      .logWorkout
      .exercises
      .map((exercise, index) => {
        return (<LogExercise
          key={index}
          index={index}
          exercise={exercise}
          doLogWorkoutExerciseDelete={this.props.doLogWorkoutExerciseDelete}
          doLogWorkoutExerciseSetData={this.props.doLogWorkoutExerciseSetData}/>);
      });
  }

  handleBtnAddExerciseClick(event) {
    event.preventDefault();
    this
      .props
      .doLogWorkoutExercise();
  };

  handleDateChange(event) {
    this
      .props
      .doLogWorkoutSetData(event.target.value, this.props.logWorkout.notes);
  }

  handleNotesChange(event) {
    this
      .props
      .doLogWorkoutSetData(this.props.logWorkout.date, event.target.value);
  }

  handleSave(event) {
    event.preventDefault();
    this
      .props
      .doLogWorkoutSave();
  }

  render() {
    if (!this.props.logWorkout.componentMounted) {
      return <div></div>;
    }

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-480 section-content">
          <div className="columns">
            <div className="column col-12">
              <h4>Log a new workout.</h4>
              <p>
                Click + to add a new exercise. Use the same exercise name for multiple sets.
              </p>
              <p>
                To convert from kilograms to pounds, enter the weight in kgs and hit the convert button.
              </p>
              <p>
                Hit the save button once finished.
              </p>
            </div>
          </div>

          <div className="columns">
            <div className="column col-12">

              <form className="form-horizontal">

                <div className="form-group">
                  <div className="col-3">
                    <label className="form-label">Date</label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-input"
                      type="date"
                      value={this.props.logWorkout.date}
                      onChange={this
                      .handleDateChange
                      .bind(this)}/>
                  </div>
                </div>
                <div
                  className={"form-group form-input-hint " + (this.props.logWorkout.dateFormHint
                  ? ''
                  : 'hide')}>
                  <div className="col-3"></div>
                  <div className="col-9">
                    {this.props.logWorkout.dateFormHint}
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-3">
                    <label className="form-label">Notes</label>
                  </div>
                  <div className="col-9">
                    <input
                      className="form-input"
                      type="text"
                      placeholder="e.g. chest and legs"
                      value={this.props.logWorkout.notes}
                      onChange={this
                      .handleNotesChange
                      .bind(this)}/>
                  </div>

                </div>

                {this.renderExercises()}

                <div className="form-group">
                  <div className="col-10"></div>
                  <div className="col-2 text-center">
                    <button
                      className="btn btn-action btn-lg circle btn-exercise-action tooltip"
                      data-tooltip="Add exercise"
                      onClick={this
                      .handleBtnAddExerciseClick
                      .bind(this)}>
                      <i className="icon icon-plus"></i>
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-12 text-center">
                    <button
                      id="btn-save-workout"
                      className="btn btn-primary btn-lg"
                      onClick={this
                      .handleSave
                      .bind(this)}>
                      Save Workout
                    </button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkout);
