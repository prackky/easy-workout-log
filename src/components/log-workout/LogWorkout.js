import React, {Component} from 'react';
import {connect} from 'react-redux';

import './log-workout.css';

import LogExercise from './LogExercise';

import userActions from '../../core/actions/userActions';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(userActions.logWorkout());
    },
    doLogWorkoutExercise: () => {
      dispatch(userActions.logWorkoutExercise());
    }
  };
};

class LogWorkout extends Component {

  componentDidMount() {
    this
      .props
      .doLogWorkout();
    this
      .props
      .doLogWorkoutExercise();
  }

  renderExercises() {
    return this
      .props
      .logWorkout
      .exercises
      .map((exercise, index) => {
        return (<LogExercise key={index} index={index} exercise={exercise}/>);
      });

  }

  handleBtnAddExerciseClick(event) {
    event.preventDefault();
    this
      .props
      .doLogWorkoutExercise();
  };

  render() {
    if (!this.props.logWorkout) {
      return <div></div>;
    }

    return (
      <div className="container grid-480">
        <div className="columns">
          <div className="column col-12">
            <h4>Log a new workout.</h4>
            <p>
            Fields marked with a * are required. Click + to add a new exercise. Hit the save button once finished.
            </p>
          </div>
        </div>
        
        <div className="columns">
          <div className="column col-12">

            <form className="form-horizontal">

              <div className="form-group">
                <div className="col-3">
                  <label className="form-label">Notes</label>
                </div>
                <div className="col-9">
                  <textarea className="form-input" placeholder="notes" rows="3" value={this.props.logWorkout.notes}></textarea>
                </div>

              </div>

              {this.renderExercises()}

              <div className="form-group">
                <div className="col-10"></div>
                <div className="col-2 text-center">
                  <button
                    className="btn btn-action btn-lg circle btn-exercise-action"
                    onClick={this
                    .handleBtnAddExerciseClick
                    .bind(this)}>
                    <i className="icon icon-plus"></i>
                  </button>
                </div>
              </div>

              <div className="form-group">
                <div className="col-12 text-center">
                  <button id="btn-save-workout" className="btn btn-primary btn-lg">
                    Save Workout
                  </button>
                </div>
              </div>

              {/*
              <div className="form-group">
                <div className="column col-4">
                  <div className="input-group">
                    <span className="input-group-addon addon-lg">Reps</span>
                    <input type="text" className="form-input input-lg" placeholder="8"/>
                  </div>
                </div>
                <div className="column col-4">
                  <div className="input-group">
                    <span className="input-group-addon addon-lg">Weight</span>
                    <input type="text" className="form-input input-lg" placeholder="100"/>
                  </div>
                </div>
              </div>
              */}

            </form>

          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkout);
