import React, {Component} from 'react';
import {connect} from 'react-redux';

// import ewoloUtil from '../../common/ewoloUtil';

import * as workoutAnalyticsService from '../../services/workoutAnalyticsService';

import AnalyticsExerciseChart from '../charts/AnalyticsExerciseChart';
import NoWorkoutsPanel from '../generic/NoWorkoutsPanel';
import AnalyticsFilter from '../generic/AnalyticsFilter';
import UserNotificationBar from '../notification/UserNotificationBar';

import analyticsActions from '../../modules/analytics/analyticsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {defaultUnits: state.user.data.units, userExerciseNames: state.user.data.userExerciseNames, analytics: state.user.analytics};
};

const mapDispatchToProps = {
  doAnalyticsExerciseFetchDataThunk: analyticsActions.analyticsExerciseFetchDataThunk,
  doAnalyticsExerciseSetFilterData: analyticsActions.analyticsExerciseSetFilterData
};

class WorkoutAnalytics extends Component {

  componentDidMount() {
    const exerciseName = workoutAnalyticsService.getExerciseName(this.props.analytics.exerciseFilterData, this.props.userExerciseNames);

    if (exerciseName) {
      this
        .props
        .doAnalyticsExerciseFetchDataThunk(exerciseName, this.props.analytics.exerciseFilterData.dateBefore, this.props.analytics.exerciseFilterData.dateAfter);
    }
  }

  componentWillReceiveProps(newProps) {
    // reload data in case filter changed or if the userExerciseNames changed
    // (happens in case of a direct page load)

    if (newProps.analytics.exerciseFilterData !== this.props.analytics.exerciseFilterData || newProps.userExerciseNames !== this.props.userExerciseNames) {

      const exerciseName = workoutAnalyticsService.getExerciseName(newProps.analytics.exerciseFilterData, newProps.userExerciseNames);

      this
        .props
        .doAnalyticsExerciseFetchDataThunk(exerciseName, newProps.analytics.exerciseFilterData.dateBefore, newProps.analytics.exerciseFilterData.dateAfter);
    }
  }

  doApplyFilter = ({exerciseNameIndex, dateBefore, dateAfter}) => {
    let exerciseName = '';
    if (exerciseNameIndex > -1) {
      exerciseName = this.props.userExerciseNames[exerciseNameIndex];
    }

    // console.log([exerciseNameIndex, dateBefore, dateAfter, exerciseName]);

    this
      .props
      .doAnalyticsExerciseSetFilterData({exerciseName, dateBefore, dateAfter});
  }

  render() {

    return (
      <div>
        <UserNotificationBar/> {this.renderAnalyticsContent()}
      </div>
    );
  }

  renderAnalyticsContent() {
    const exerciseName = workoutAnalyticsService.getExerciseName(this.props.analytics.exerciseFilterData, this.props.userExerciseNames);
    const analyticscontent = (this.props.userExerciseNames.length === 0)
      ? (<NoWorkoutsPanel history={this.props.history}/>)
      : (<AnalyticsFilter
        exerciseNames={this.props.userExerciseNames}
        doApplyFilter={this.doApplyFilter}
        selectedExerciseName={exerciseName}
        selectedDateBefore={this.props.analytics.exerciseFilterData.dateBefore}
        selectedDateAfter={this.props.analytics.exerciseFilterData.dateAfter}/>);

    const analyticsExerciseData = this.props.analytics.exercise[exerciseName] || [];

    const chartContent = (this.props.userExerciseNames.length)
      ? (analyticsExerciseData.length
        ? this.renderChart(exerciseName, analyticsExerciseData)
        : this.renderNoChartData())
      : '';

    const callToAction = (this.props.userExerciseNames.length)
      ? this.renderCallToAction()
      : '';

    return (
      <div>
        <div className="container grid-md section-content">
          <div className="columns">
            <div className="column col-12">
              <h3>Exercise Analytics</h3>
              {analyticscontent}
            </div>
          </div>
        </div>

        {chartContent}

        {callToAction}
      </div>
    )
  }

  renderNoChartData() {
    return (
      <div className="container grid-md section-content">
        <div className="columns">
          <div className="empty width-100">
            <div className="empty-icon">
              <i className="icon icon-flag"></i>
            </div>
            <h4 className="empty-title">No data found</h4>
            <div className="empty-subtitle">Try expanding the date range and click the apply filter button</div>
          </div>
        </div>
      </div>
    );
  }

  renderChart(exerciseName, analyticsExerciseData) {

    return (
      <div className="container grid-xl section-content">
        <div className="columns">
          <div className="column col-12">
            <AnalyticsExerciseChart
              exerciseName={exerciseName}
              analyticsExerciseData={analyticsExerciseData}
              defaultUnits={this.props.defaultUnits}/>
          </div>
        </div>
      </div>
    );
  }

  renderCallToAction() {
    return (
      <div className="container grid-md section-content">
        <div className="columns margin-top-2rem">
          <div className="column col-12 text-center">
            <button
              className="btn btn-primary btn-lg"
              onClick={this.handleBtnLogWorkoutClick}>Log a new workout</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutAnalytics);
