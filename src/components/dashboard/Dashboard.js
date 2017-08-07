import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
// import PropTypes from 'prop-types' import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {segregateWorkoutsByMonth, orderWorkoutsByDate} from '../../services/workoutsService';

import WorkoutView from './WorkoutView';
import DashboardProgress from './DashboardProgress';
import UserNotificationBar from '../notification/UserNotificationBar';

import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';
import logWorkoutActions from '../../modules/log-workout/logWorkoutActions'

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    // ...ownProps,
    dashboard: state.user.dashboard,
    defaultUnits: state.user.data.units,
    workouts: state.user.workouts.workouts,
    lastWorkoutDate: state.user.workouts.lastWorkoutDate,
    displayMoreWorkouts: state.user.workouts.displayMoreWorkouts
  };
};

const mapDispatchToProps = {
  doFetchUserWorkoutsThunk: userWorkoutsActions.fetchUserWorkoutsThunk,
  doDeleteUserWorkoutThunk: userWorkoutsActions.deleteUserWorkoutThunk,
  // doToggleViewWorkoutDetails: userWorkoutsActions.userWorkoutsSetViewDetails,
  doCopyWorkoutThunk: logWorkoutActions.logWorkoutCopyThunk,
  doEditWorkoutThunk: logWorkoutActions.logWorkoutEditThunk
};

class Dashboard extends Component {
  
  constructor(props) {
    super(props);

    const state = {
      accordionShow: false,
      workoutsViewDetails: {}
    };

    this.state = state;
  }

  componentDidMount() {
    this
      .props
      .doFetchUserWorkoutsThunk();
    
      // console.log(this.props);
  }

  /*
  componentDidUpdate() {
    console.log('dashboard update');
  }
  */

  handleBtnShowOlderWorkoutsClick = (event) => {
    event.preventDefault();

    this
      .props
      .doFetchUserWorkoutsThunk(this.props.lastWorkoutDate);
  }

  toggleWorkoutViewDetails = (workoutId, show) => {
    const workoutsViewDetails = this.state.workoutsViewDetails;
    workoutsViewDetails[workoutId] = show;

    this.setState({
      ...this.state,
      workoutsViewDetails: {
        ...workoutsViewDetails
      }
    });
  }

  render() {

    const sortedWorkouts = orderWorkoutsByDate(this.props.workouts);

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-960 section-content">
          <div className="columns">
            <div className="column col-12">
              <DashboardProgress/>              
            </div>
          </div>
          <div className="columns">
            <div className="column col-12">
              <h3>Workouts</h3>
              <p className="no-text">
                Click on a workout to toggle details.
              </p>
              <p className="no-text">
                Tempo (default 101) and Rest (default 60) are only displayed if not default
                values. Exercise weight units are only displayed when different from&nbsp;
                <Link to="/account">account settings</Link>.
              </p>
            </div>
            <div className="accordion width-100">
              {this.renderWorkouts(sortedWorkouts)}
            </div>
          </div>
          {this.props.displayMoreWorkouts && (
            <div className="columns margin-top-1rem">
              <div className="column col-12 text-center">
                <button
                  className="btn btn-link btn-lg"
                  onClick={this.handleBtnShowOlderWorkoutsClick}>Show older workouts</button>
              </div>
            </div>
          )
}
          {(sortedWorkouts.length > 0) && (
            <div className="columns margin-top-3rem">
              <div className="column col-12 text-center">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={this.handleBtnLogWorkoutClick}>Log a new workout</button>
              </div>
            </div>
          )
}
        </div>
      </div>
    );
  }

  renderWorkouts(sortedWorkouts) {

    if (sortedWorkouts.length === 0) {
      return (
        <div className="columns col-12">
          <div className="empty width-100">
            <div className="empty-icon">
              <i className="icon icon-flag"></i>
            </div>
            <h4 className="empty-title">You have no workouts logged</h4>
            <div className="empty-subtitle">Click the button to log a new workout</div>
            <div className="empty-action">
              <button className="btn btn-primary" onClick={this.handleBtnLogWorkoutClick}>Log Workout</button>
            </div>
          </div>
        </div>
      );
    }

    const monthlyWorkouts = segregateWorkoutsByMonth(sortedWorkouts);

    return monthlyWorkouts.map(monthlyWorkoutList => {
      return (
        <div key={monthlyWorkoutList.key}>
          <div className="columns">
            <div className="column col-12">
              <h5 className="text-center">{monthlyWorkoutList.key}</h5>
            </div>
          </div>
          {monthlyWorkoutList
            .workouts
            .map((workout) => {
              return (<WorkoutView
                key={workout.id}
                workout={workout}
                defaultUnits={this.props.defaultUnits}
                showWorkoutDetails={this.state.workoutsViewDetails[workout.id]
                ? true
                : false}
                doDeleteUserWorkoutThunk={this.props.doDeleteUserWorkoutThunk}
                doToggleViewWorkoutDetails={this.toggleWorkoutViewDetails}
                doCopyWorkoutThunk={this.props.doCopyWorkoutThunk}
                doEditWorkoutThunk={this.props.doEditWorkoutThunk}/>);
            })}
        </div>
      );
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard)); // need to wrap this to allow history push
