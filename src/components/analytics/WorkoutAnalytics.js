import React, {Component} from 'react';
import {/*Link, */
  withRouter
} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import Chartist from 'chartist';

import ChartistGraph from 'react-chartist';

import ewoloUtil from '../../common/ewoloUtil';
import {ctAxisTitle, ctPointLabels, ChartistLegend} from '../generic/ChartistPlugins';
import * as workoutAnalyticsService from '../../services/workoutAnalyticsService';

import NoWorkoutsPanel from '../generic/NoWorkoutsPanel';
import AnalyticsFilter from '../generic/AnalyticsFilter';
import UserNotificationBar from '../notification/UserNotificationBar';

import analyticsActions from '../../modules/analytics/analyticsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {defaultUnits: state.user.data.units, workoutsAnalysis: state.user.workouts.workoutsAnalysis, userExerciseNames: state.user.data.userExerciseNames, analyticsExercise: state.user.analytics.exercise};
};

const mapDispatchToProps = {
  doAnalyticsExerciseFetchDataThunk: analyticsActions.analyticsExerciseFetchDataThunk
};

const getWindowWidth = () => {
  var w = window,
    d = document,
    documentElement = d.documentElement,
    body = d.getElementsByTagName('body')[0],
    width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

  return width;
}

class WorkoutAnalytics extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: getWindowWidth(),
      exerciseName: (props.userExerciseNames.length
        ? props.userExerciseNames[0]
        : '')
    };
  }

  getCtClassName() {
    if (this.state.width < 400) {
      return 'ct-square';
    }

    if (this.state.width < 600) {
      return 'ct-perfect-fourth';
    }

    return 'ct-major-tenth';
  }

  updateDimensions = () => {
    const newState = this.state;
    newState.width = getWindowWidth();
    this.setState(newState);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    if (this.state.exerciseName) {
      this
        .props
        .doAnalyticsExerciseFetchDataThunk(this.state.exerciseName);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
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

        {this.renderChart()}

        {this.renderCallToAction()}
      </div>
    )
  }

  renderChart() {

    /*
    const chartData = {
      series: [
        {
          name: 'series-1',
          data: [
            {
              x: new Date(143134652600),
              y: 53
            }, {
              x: new Date(143234652600),
              y: 40
            }, {
              x: new Date(143340052600),
              y: 45
            }, {
              x: new Date(143366652600),
              y: 40
            }, {
              x: new Date(143410652600),
              y: 20
            }, {
              x: new Date(143508652600),
              y: 32
            }, {
              x: new Date(143569652600),
              y: 18
            }, {
              x: new Date(143579652600),
              y: 11
            }
          ]
        }, {
          name: 'series-2',
          data: [
            {
              x: new Date(143134652600),
              y: 53
            }, {
              x: new Date(143234652600),
              y: 35
            }, {
              x: new Date(143334652600),
              y: 30
            }, {
              x: new Date(143384652600),
              y: 30
            }, {
              x: new Date(143568652600),
              y: 10
            }
          ]
        }
      ]
    };
    */

    const analyticsExerciseData = this.props.analyticsExercise[this.state.exerciseName] || [];

    if (analyticsExerciseData.length === 0) {
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

    const analyticsExerciseChartData = {
      series: workoutAnalyticsService.getAnalyticsExerciseChartistSeriesData(analyticsExerciseData)
    };

    // console.log(chartData); console.log(analyticsExerciseChartData);

    // TODO: consider adding a tooltip
    // https://github.com/gsklee/react-chartist-tooltip/blob/master/react-chartist-t
    // o oltip.babel.js
    // TODO: enable legend click functionality
    const chartOptions = {
      chartPadding: {
        top: 10,
        right: 0,
        bottom: 30,
        left: 20
      },
      lineSmooth: Chartist
        .Interpolation
        .cardinal({fillHoles: true}),
      low: 0,
      axisX: {
        // type: Chartist.Chartist, divisor: 5,
        type: Chartist.AutoScaleAxis,
        scaleMinSpace: 50,
        labelInterpolationFnc: function (value) {
          return moment(value).format('D MMM YY');
        }
      },
      plugins: [
        ctAxisTitle({
          axisX: {
            axisTitle: 'Days',
            axisClass: 'ct-axis-title',
            offset: {
              x: 0,
              y: 50
            },
            textAnchor: 'middle'
          },
          axisY: {
            axisTitle: 'Weight (' + ewoloUtil.unitsToText(this.props.defaultUnits) + ')',
            axisClass: 'ct-axis-title',
            offset: {
              x: -50,
              y: 20
            },
            flipTitle: true
          }
        }),
        ctPointLabels({textAnchor: 'middle'})
      ]
    };

    return (
      <div className="container grid-1280 section-content">
        <div className="columns">
          <div className="column col-12">
            <div>
              Showing progress data for&nbsp;
              <strong>{this.state.exerciseName}</strong>
            </div>
            <ChartistLegend series={analyticsExerciseChartData.series}></ChartistLegend>
            <ChartistGraph
              data={analyticsExerciseChartData}
              options={chartOptions}
              type={'Line'}
              className={this.getCtClassName()}/>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WorkoutAnalytics)); // need to wrap this to allow history push
