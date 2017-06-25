import React, {Component} from 'react';
// import PropTypes from 'prop-types'
// import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import WorkoutView from './WorkoutView';
import UserNotificationBar from '../notification/UserNotificationBar';
import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    // ...ownProps,
    dashboard: state.user.dashboard,
    workouts: state.user.workouts.workouts,
    workoutsViewDetails: state.user.workouts.workoutsViewDetails
  };
};

const mapDispatchToProps = {
  doFetchUserWorkoutsThunk: userWorkoutsActions.fetchUserWorkoutsThunk,
  doToggleViewWorkoutDetails: userWorkoutsActions.userWorkoutsSetViewDetails
};

class Dashboard extends Component {
  /*
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  */

  state = {
    accordionShow: false
  };

  componentDidMount() {
    this
      .props
      .doFetchUserWorkoutsThunk();
  }

  render() {

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-960 section-content">
          <div className="columns">
            <div className="column col-12">
              <h4>Progress</h4>
            </div>
          </div>
          <div className="columns">
            <div className="column col-12">
              <h4>Workouts</h4>
              <p>
                Click on a workout to toggle details.
              </p>
              <p>
                Tempo (default 101) and Rest (default 60) are only displayed if not default
                values.
              </p>
            </div>
            <div className="accordion width-100">
              {this.renderWorkouts()}
            </div>
          </div>
          <div className="columns">
            <div className="column col-12 text-center">
              <button
                className="btn btn-primary btn-lg"
                onClick={this.handleBtnLogWorkoutClick}>Log a new workout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderWorkouts() {

    if (this.props.workouts.length === 0) {
      return (
        <div className="columns col-12">
          <div className="empty width-100">
            <div className="empty-icon">
              <i className="icon icon-flag"></i>
            </div>
            <h4 className="empty-title">You have no workouts logged</h4>
            <p className="empty-subtitle">Click the button to log a new workout</p>
            <div className="empty-action">
              <button className="btn btn-primary" onClick={this.handleBtnLogWorkoutClick}>Log Workout</button>
            </div>
          </div>
        </div>
      );
    }

    return this
      .props
      .workouts
      .map((workout) => {
        return (<WorkoutView
          key={workout.id}
          workout={workout}
          showWorkoutDetails={this.props.workoutsViewDetails[workout.id]
          ? true
          : false}
          doToggleViewWorkoutDetails={this.props.doToggleViewWorkoutDetails}/>);
      });
  }

  handleBtnLogWorkoutClick = (event) => {
    event.preventDefault();
    this
      .props
      .history
      .push('/log-workout');
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
