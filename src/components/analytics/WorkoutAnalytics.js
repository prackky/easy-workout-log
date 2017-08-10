import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import AnalyticsFilter from '../generic/AnalyticsFilter';
import UserNotificationBar from '../notification/UserNotificationBar';

const mapStateToProps = (state/*, ownProps*/) => {
  return {defaultUnits: state.user.data.units, workoutsAnalysis: state.user.workouts.workoutsAnalysis, userExerciseNames: state.user.data.userExerciseNames};
};

const mapDispatchToProps = {
  // doFetchUserWorkoutsAnalysisThunk: userWorkoutsActions.fetchUserWorkoutsAnalysisThunk
};

class WorkoutAnalytics extends Component {

  constructor(props) {
    super(props);
  }

  doApplyFilter = ({exerciseNameIndex, dateBefore, dateAfter}) => {
    const exerciseName = this.props.userExerciseNames[exerciseNameIndex];
    console.log([exerciseNameIndex, dateBefore, dateAfter]);
    /*
    this
      .props
      .doFetchUserWorkoutsAnalysisThunk(dateBefore, dateAfter, exerciseName);
    */
  }

  render() {

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-1280 section-content">
          <div className="columns">
            <div className="column col-12">
              <h3>Analytics</h3>

              <AnalyticsFilter
                exerciseNames={this.props.userExerciseNames}
                doApplyFilter={this.doApplyFilter}/>
            </div>
          </div>

          <div className="columns margin-top-3rem">
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

  handleBtnLogWorkoutClick = (event) => {
    event.preventDefault();
    this
      .props
      .history
      .push('/log-workout');
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutAnalytics)); // need to wrap this to allow history push
