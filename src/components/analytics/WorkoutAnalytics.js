import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import moment from 'moment';
import Chartist from 'chartist';

import ChartistGraph from 'react-chartist';

import {ctAxisTitle, legend} from '../generic/ChartistPlugins';

import NoWorkoutsPanel from '../generic/NoWorkoutsPanel';
import AnalyticsFilter from '../generic/AnalyticsFilter';
import UserNotificationBar from '../notification/UserNotificationBar';

const mapStateToProps = (state/*, ownProps*/) => {
  return {defaultUnits: state.user.data.units, workoutsAnalysis: state.user.workouts.workoutsAnalysis, userExerciseNames: state.user.data.userExerciseNames};
};

const mapDispatchToProps = {
  // doFetchUserWorkoutsAnalysisThunk:
  // userWorkoutsActions.fetchUserWorkoutsAnalysisThunk
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
      }
    }
  }

  doApplyFilter = ({exerciseNameIndex, dateBefore, dateAfter}) => {
    let exerciseName = '';
    if (exerciseNameIndex > -1) {
      exerciseName = this.props.userExerciseNames[exerciseNameIndex];
    }

    console.log([exerciseNameIndex, dateBefore, dateAfter, exerciseName]);

    /*
    this
      .props
      .doFetchUserWorkoutsAnalysisThunk(dateBefore, dateAfter, exerciseName);
    */
  }

  render() {

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

    const chartOptions = {
      chartPadding: {
        top: 40,
        right: 0,
        bottom: 30,
        left: 20
      },
      axisX: {
        // type: Chartist.Chartist, divisor: 5,
        type: Chartist.AutoScaleAxis,
        scaleMinSpace: 50,
        labelInterpolationFnc: function (value) {
          return moment(value).format('MMM D');
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
            axisTitle: 'Weight',
            axisClass: 'ct-axis-title',
            offset: {
              x: -50,
              y: 20
            },
            flipTitle: true
          }
        }),
        legend()
      ]
    };

    return (
      <div>
        <UserNotificationBar/>

        <div className="container grid-960 section-content">
          <div className="columns">
            <div className="column col-12">
              <h3>Analytics</h3>

              <AnalyticsFilter
                exerciseNames={this.props.userExerciseNames}
                doApplyFilter={this.doApplyFilter}/>
            </div>
          </div>
        </div>

        <div className="container grid-1280 section-content">
          <div className="columns">
            <div className="column col-12">
              <div>
                Showing progress data for
                <strong>{this.state.exerciseName}</strong>
              </div>
              <ChartistGraph
                data={chartData}
                options={chartOptions}
                type={'Line'}
                className={this.getCtClassName()}/>
            </div>
          </div>
        </div>

        {this.renderCallToAction()}

      </div>
    );
  }

  renderCallToAction() {
    if (this.props.workoutsAnalysis.length === 0) {
      return (<NoWorkoutsPanel history={this.props.history}/>);
    }

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
