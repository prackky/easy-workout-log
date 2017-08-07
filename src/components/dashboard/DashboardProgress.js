import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

import {getChartData} from '../../services/workoutsService';

import Modal from '../generic/Modal';
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
      columns: workoutsAnalysisChartData.columns,
      dateBefore: '',
      dateAfter: '',
      showStartDateHelp: false,
      showEndDateHelp: false,
      dateRange: 'custom'
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

  componentDidUpdate(prevProps, prevState) {
    console.log('DashboardProgress update');
    console.log(this.state);
  }

  handleDateAfterChange = (event) => {
    event.preventDefault();
    const newState = this.state;
    newState.dateAfter = event.target.value;
    this.setState(newState);
  }

  handleDateBeforeChange = (event) => {
    event.preventDefault();
    const newState = this.state;
    newState.dateBefore = event.target.value;
    this.setState(newState);
  }

  handleBtnApplyFilterClick = (event) => {
    event.preventDefault();
    this
      .props
      .doFetchUserWorkoutsAnalysisThunk(this.state.dateBefore, this.state.dateAfter);
  }

  handleStartDateHelpClick = (event) => {
    event.preventDefault();
    const newState = this.state;
    newState.showStartDateHelp = true;
    this.setState(newState);
  }

  doCloseStartDateHelp = () => {
    const newState = this.state;
    newState.showStartDateHelp = false;
    this.setState(newState);
  }

  handleEndDateHelpClick = (event) => {
    event.preventDefault();
    const newState = this.state;
    newState.showEndDateHelp = true;
    this.setState(newState);
  }

  doCloseEndDateHelp = () => {
    const newState = this.state;
    newState.showEndDateHelp = false;
    this.setState(newState);
  }

  handleDateRangeSelectionChange = (event) => {
    const newState = this.state;
    newState.dateRange = event.target.value;

    newState.dateBefore = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD');

    switch (newState.dateRange) {
      case 'last-week':
        {
          newState.dateAfter = moment()
            .subtract(8, 'days')
            .format('YYYY-MM-DD');
          break;
        }
      case 'last-month':
        {
          newState.dateAfter = moment()
            .subtract(1, 'months')
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
          break;
        }
      case 'last-year':
        {
          newState.dateAfter = moment()
            .subtract(1, 'years')
            .subtract(1, 'days')
            .format('YYYY-MM-DD');
          break;
        }
      default:
        {
          // do nothing
        }
    }

    this.setState(newState);
  }

  render() {

    return (
      <div>
        <h3>Progress</h3>

        <p className="no-text">
          User the fields below to filter the progress chart. All filter fields are
          optional.
        </p>

        <Modal
          doModalActionCancel={this.doCloseStartDateHelp}
          showModal={this.state.showStartDateHelp}
          size="sm"
          title="Dashboard date filter"
          content={['The start date is non-inclusive, i.e. picking the 1st of January means that the workouts will be shown from the 2nd January onwards.']}/>

        <Modal
          doModalActionCancel={this.doCloseEndDateHelp}
          showModal={this.state.showEndDateHelp}
          size="sm"
          title="Dashboard date filter"
          content={['The end date is non-inclusive, i.e. picking the 31st of December means that the workouts will be shown from the 30th of December and before.']}/>

        <div className="container grid-480">
          <div className="columns">
            <div className="column col-12">
              <form className="form-horizontal">

                <div className="form-group">
                  <div className="col-4">
                    <label className="form-label">Period</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select"
                      value={this.state.dateRange}
                      onChange={this.handleDateRangeSelectionChange}>
                      <option value="custom">Custom</option>
                      <option value="last-week">Last week</option>
                      <option value="last-month">Last month</option>
                      <option value="last-year">Last year</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-4">
                    <label className="form-label">
                      <a onClick={this.handleStartDateHelpClick}>Start Date</a>
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className={"form-input"}
                      disabled={this.state.dateRange !== 'custom'}
                      type="date"
                      value={this.state.dateAfter}
                      onChange={this.handleDateAfterChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-4">
                    <label className="form-label">
                      <a onClick={this.handleEndDateHelpClick}>End Date</a>
                    </label>
                  </div>
                  <div className="col-8">
                    <input
                      className={"form-input"}
                      type="date"
                      disabled={this.state.dateRange !== 'custom'}
                      value={this.state.dateBefore}
                      onChange={this.handleDateBeforeChange}/>
                  </div>
                </div>

                <div className="form-group">
                  <div className="col-12 text-center">
                    <button
                      className={"btn btn-primary btn-lg " + ((this.state.dateBefore || this.state.dateAfter)
                      ? ''
                      : 'disabled')}
                      onClick={this.handleBtnApplyFilterClick}>Apply filter</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>

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
