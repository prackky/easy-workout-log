import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import './welcome.css';

import logWorkoutActions from '../modules/log-workout/logWorkoutActions';

const mapStateToProps = (state) => {
  return {user: state.user};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(logWorkoutActions.logWorkout());
    }
  };
};

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: ''
    };
    console.log(this.state);
  }

  handleBtnLogWorkoutClick = () => {
    this.setState({redirect: '/log-workout'}); // using react-router with a button is not straightforward at all
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect push to={this.state.redirect}/>);
    }

    return (
      <div className="container">
        <div className="columns">
          <div className="column col-12">
            <div className="text-center">
              <h2>Ewolo</h2>
              <h4>Workout tracking made simple</h4>
              {/* background image this with a logo */}
              <button
                className="btn btn-primary btn-welcome-log-workout"
                onClick={this
                .handleBtnLogWorkoutClick
                .bind(this)}>Log a workout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
