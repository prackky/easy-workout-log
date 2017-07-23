import React, {Component} from 'react';
import {connect} from 'react-redux';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';

import LogWorkout from './LogWorkout';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout, defaultUnits: state.user.data.units};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(logWorkoutActions.logWorkout());
    },
    doLogWorkoutExercise: ({
      name,
      reps,
      weight,
      sets,
      tempo,
      rest,
      showAdvanced,
      units
    }) => {
      dispatch(logWorkoutActions.logWorkoutExercise({
        name,
        reps,
        weight,
        sets,
        tempo,
        rest,
        showAdvanced,
        units
      }));
    }
  };
};

class LogWorkoutNew extends Component {

  componentDidMount() {
    if (!this.props.logWorkout.componentMounted) { // Well we want to keep the form the way it was.
      this
        .props
        .doLogWorkout();
      this
        .props
        .doLogWorkoutExercise({units: this.props.defaultUnits});
    }
  }

  render() {
    if (!this.props.logWorkout.componentMounted) {
      return <div></div>;
    }

    return (<LogWorkout/>);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkoutNew);
