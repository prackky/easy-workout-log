import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getChartData} from '../../services/workoutsService';

import AnalyticsFilter from '../generic/AnalyticsFilter';
import DateVsWeightScatterChart from '../generic/DateVsWeightScatterChart';
import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    defaultUnits: state.user.data.units,
    workoutsAnalysis: state.user.workouts.workoutsAnalysis,
    userExerciseNames: [
      '', ...state.user.data.userExerciseNames
    ]
  };
};

const mapDispatchToProps = {
  doFetchUserWorkoutsAnalysisThunk: userWorkoutsActions.fetchUserWorkoutsAnalysisThunk
};

class DashboardProgress extends Component {

  constructor(props) {
    super(props);

    const workoutsAnalysisChartData = getChartData(props.workoutsAnalysis);

    const state = {
      chartEvents: [
        {
          eventName: 'select',
          callback(Chart) {
            // Returns Chart so you can access props and  the ChartWrapper object from
            // chart.wrapper console.log('Selected ', Chart.chart.getSelection());
          }
        }
      ],
      rows: workoutsAnalysisChartData.rows,
      columns: workoutsAnalysisChartData.columns,
      filterExerciseName: 0,
      filterDateBefore: '',
      filterDateAfter: ''
    };

    this.state = state;
  }

  componentDidMount() {
    this
      .props
      .doFetchUserWorkoutsAnalysisThunk();

    // console.log(this.props);
  }

  componentWillReceiveProps(newProps) {
    // update chart if something changed most likely this will happen in the case
    // that we roll back to this page
    if (this.props.workoutsAnalysis !== newProps.workoutsAnalysis) {
      const workoutsAnalysisChartData = getChartData(newProps.workoutsAnalysis);
      const newState = this.state;
      newState.rows = workoutsAnalysisChartData.rows;
      this.setState(newState);
    }

    if (this.props.defaultUnits !== newProps.defaultUnits) {
      this
        .props
        .doFetchUserWorkoutsAnalysisThunk();
    }
  }

  /*
  componentDidUpdate(prevProps, prevState) {
    console.log('DashboardProgress update');
    console.log(this.state);
  }
  */

  doApplyFilter = ({exerciseNameIndex, dateBefore, dateAfter}) => {
    const exerciseName = this.props.userExerciseNames[exerciseNameIndex];

    const newState = this.state;
    newState.filterExerciseName = exerciseName;
    newState.filterDateBefore = dateBefore;
    newState.filterDateAfter = dateAfter;

    this.setState(newState);

    this
      .props
      .doFetchUserWorkoutsAnalysisThunk(dateBefore, dateAfter, exerciseName);
  }

  render() {

    return (
      <div>
        <h3>Progress</h3>

        <AnalyticsFilter
          exerciseNames={this.props.userExerciseNames}
          doApplyFilter={this.doApplyFilter}
          selectedExerciseName={this.state.filterExerciseName}
          selectedDateBefore={this.state.filterDateBefore}
          selectedDateAfter={this.state.filterDateAfter}/>

        <DateVsWeightScatterChart
          units={this.props.defaultUnits}
          rows={this.state.rows}
          columns={this.state.columns}
          chartEvents={this.state.chartEvents}/>

      </div>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProgress);
