import React, {Component} from 'react';
import {connect} from 'react-redux';

// import ewoloUtil from '../../common/ewoloUtil';

import AnalyticsExerciseChart from './AnalyticsExerciseChart';
import NoWorkoutsPanel from '../generic/NoWorkoutsPanel';
import AnalyticsFilter from '../generic/AnalyticsFilter';
import UserNotificationBar from '../notification/UserNotificationBar';

import analyticsActions from '../../modules/analytics/analyticsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {defaultUnits: state.user.data.units, workoutsAnalysis: state.user.workouts.workoutsAnalysis, userExerciseNames: state.user.data.userExerciseNames, analytics: state.user.analytics};
};

const mapDispatchToProps = {
  doAnalyticsExerciseFetchDataThunk: analyticsActions.analyticsExerciseFetchDataThunk
};

class WorkoutAnalytics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      exerciseName: (props.userExerciseNames.length
        ? props.userExerciseNames[0]
        : '')
    };
  }

  getExerciseName() {
    const result = this.props.analytics.selectedExerciseName
      ? this.props.analytics.selectedExerciseName
      : (this.props.userExerciseNames.length)
        ? this.props.userExerciseNames[0]
        : '';

    return result;
  }

  componentDidMount() {
    if (this.state.exerciseName) {
      this
        .props
        .doAnalyticsExerciseFetchDataThunk(this.state.exerciseName);
    }
  }

  componentWillReceiveProps(newProps) {
    // this function is pretty much only in existence to set the correct exercise
    // name in the case that the page is loaded directly.
    if (this.props.userExerciseNames !== newProps.userExerciseNames) {
      if (newProps.userExerciseNames.length) {
        const newState = this.state;
        newState.exerciseName = newProps.userExerciseNames[0];
        this.setState(newState);

        this
          .props
          .doAnalyticsExerciseFetchDataThunk(newState.exerciseName);
      }
    }
  }

  doApplyFilter = ({exerciseNameIndex, dateBefore, dateAfter}) => {
    let exerciseName = '';
    if (exerciseNameIndex > -1) {
      exerciseName = this.props.userExerciseNames[exerciseNameIndex];
    }

    console.log([exerciseNameIndex, dateBefore, dateAfter, exerciseName]);

    const newState = this.state;
    newState.exerciseName = exerciseName;
    this.setState(newState);

    this
      .props
      .doAnalyticsExerciseFetchDataThunk(exerciseName, dateBefore, dateAfter);
  }

  render() {

    return (
      <div>
        <UserNotificationBar/> {this.renderAnalyticsContent()}
      </div>
    );
  }

  renderAnalyticsContent() {
    const analyticscontent = (this.props.userExerciseNames.length === 0)
      ? (<NoWorkoutsPanel history={this.props.history}/>)
      : (<AnalyticsFilter
        exerciseNames={this.props.userExerciseNames}
        doApplyFilter={this.doApplyFilter}/>);

    const analyticsExerciseData = this.props.analytics.exercise[this.state.exerciseName] || [];

    const chartContent = (analyticsExerciseData.length)
      ? this.renderChart(analyticsExerciseData)
      : this.renderNoChartData();

    return (
      <div>
        <div className="container grid-960 section-content">
          <div className="columns">
            <div className="column col-12">
              <h3>Exercise Analytics</h3>
              {analyticscontent}
            </div>
          </div>
        </div>

        {chartContent}

        {this.renderCallToAction()}
      </div>
    )
  }

  renderNoChartData() {
    return (
      <div className="container grid-960 section-content">
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

  renderChart(analyticsExerciseData) {

    return (
      <div className="container grid-1280 section-content">
        <div className="columns">
          <div className="column col-12">
            <AnalyticsExerciseChart
              exerciseName={this.state.exerciseName}
              analyticsExerciseData={analyticsExerciseData}/>
          </div>
        </div>
      </div>
    );
  }

  renderCallToAction() {
    return (
      <div className="container grid-960 section-content">
        <div className="columns margin-top-3rem">
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

// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutAnalytics)); // need to wrap this to allow history push

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutAnalytics);
