import React, {Component} from 'react';
import {connect} from 'react-redux';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';
import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';

import LogWorkout from './LogWorkout';

const mapStateToProps = (state) => {
  return {workouts: state.user.workouts.workouts, userData: state.user.data};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkoutEdit: (workout) => {
      dispatch(logWorkoutActions.logWorkoutEdit(workout));
    },
    doFetchUserWorkout: (userId, workoutId) => {
      dispatch(userWorkoutsActions.fetchUserWorkoutThunk(userId, workoutId));
    }
  };
};

class LogWorkoutEdit extends Component {

  getWorkoutId() {
    return this.props.match.params.workoutId;
  }

  componentDidMount() {
    const workoutId = this.getWorkoutId();
    const workout = this.props.workouts[workoutId];
    if (workout) {
      this
        .props
        .doLogWorkoutEdit(workout);
    } else {
      this
        .props
        .doFetchUserWorkout(this.props.userData.id, this.props.match.params.workoutId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const workoutId = this.getWorkoutId();
    const workout = this.props.workouts[workoutId];

    // only do logWorkoutEdit if you aren't already editing a workout
    if (!workout) {
      const loadedWorkout = nextProps.workouts[workoutId];
      if (loadedWorkout) {
        this
          .props
          .doLogWorkoutEdit(loadedWorkout);
      }
    }
  }

  render() {
    return (<LogWorkout/>);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkoutEdit);
