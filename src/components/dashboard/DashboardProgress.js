import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getChartData} from '../../services/workoutsService';

import DateVsWeightScatterChart from '../generic/DateVsWeightScatterChart';
import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {defaultUnits: state.user.data.units, workoutsAnalysis: state.user.workouts.workoutsAnalysis};
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
      columns: workoutsAnalysisChartData.columns
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
  }

  /*
  componentDidUpdate() {
    console.log('dashboard update');
  }
  */

  render() {

    return (
      <div>
        <h3>Progress</h3>
        <DateVsWeightScatterChart
          units={this.props.defaultUnits}
          rows={this.state.rows}
          columns={this.state.columns}
          chartEvents={this.state.chartEvents}/>
      </div>
    );
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardProgress); // need to wrap this to allow history push
