import React, {Component} from 'react';
import {connect} from 'react-redux';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';

import LogWorkout from './LogWorkout';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(logWorkoutActions.logWorkout());
    },
    doLogWorkoutExercise: (name, reps, weight, sets, tempo, rest, showAdvanced) => {
      dispatch(logWorkoutActions.logWorkoutExercise({
        name,
        reps,
        weight,
        sets,
        tempo,
        rest,
        showAdvanced
      }));
    }
  };
};

class LogWorkoutNew extends Component {

  componentDidMount() {
    if (!this.props.logWorkout.componentMounted) {
      // TODO: consider maintaining mount status in local state
      this
        .props
        .doLogWorkout();
      this
        .props
        .doLogWorkoutExercise();
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

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkoutNew);
