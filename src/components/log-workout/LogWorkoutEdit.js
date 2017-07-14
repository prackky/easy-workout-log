import React, {Component} from 'react';
import {connect} from 'react-redux';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';

import LogWorkout from './LogWorkout';

const mapStateToProps = (state) => {
  return {
    logWorkout: state.user.logWorkout
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    
  };
};

class LogWorkoutEdit extends Component {

  componentDidMount() {
    console.log(this.props.match.params.workoutId);
    if (!this.props.logWorkout.componentMounted) {
      // TODO: fetch data here
    }
  }

  render() {
    if (!this.props.logWorkout.componentMounted) {
      return <div></div>;
    }

    return (
      <LogWorkout/>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkoutEdit);
