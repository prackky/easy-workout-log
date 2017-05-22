import React, {Component} from 'react';
import {connect} from 'react-redux';

import userActions from '../core/actions/userActions';

const mapStateToProps = (state) => {
  return {logWorkout: state.user.logWorkout};
};

const mapDispatchToProps = (dispatch) => {
  return {
    logWorkout: () => {
      dispatch(userActions.logWorkout());
    }
  };
};

class LogWorkout extends Component {

  constructor(props) {
    super(props);
    this.props.logWorkout();
  }

  render() {
    return (
      <div>
        LogWorkout
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LogWorkout);
