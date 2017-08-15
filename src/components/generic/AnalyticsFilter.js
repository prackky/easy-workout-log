import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import Modal from './Modal';

class AnalyticsFilter extends Component {

  static propTypes = {
    exerciseNames: PropTypes
      .arrayOf(PropTypes.string)
      .isRequired,
    doApplyFilter: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      dateBefore: '',
      dateAfter: '',
      showStartDateHelp: false,
      showEndDateHelp: false,
      dateRange: 'custom',
      exerciseNameIndex: 0
    };
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
    // event.preventDefault();

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

  handleExerciseNameSelectionChange = (event) => {
    // event.preventDefault();
    const newState = this.state;
    newState.exerciseNameIndex = event.target.value;
    this.setState(newState);
  }

  handleBtnApplyFilterClick = (event) => {
    event.preventDefault();
    this
      .props
      .doApplyFilter({exerciseNameIndex: this.state.exerciseNameIndex, dateBefore: this.state.dateBefore, dateAfter: this.state.dateAfter});
  }

  render() {
    const exerciseNameOptions = this
      .props
      .exerciseNames
      .map((name, index) => {
        return (
          <option value={index} key={index}>{name}</option>
        );
      });

    return (
      <div>
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
              <p className="no-text">
                Use the fields below to filter the chart. All filter fields are optional. Click the apply filter button to reload chart data.
              </p>
              
              <form className="form-horizontal">

                <div className="form-group">
                  <div className="col-4">
                    <label className="form-label">Exercise</label>
                  </div>
                  <div className="col-8">
                    <select
                      className="form-select"
                      value={this.state.exerciseNameIndex}
                      onChange={this.handleExerciseNameSelectionChange}>
                      {exerciseNameOptions}
                    </select>
                  </div>
                </div>

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
                      className={"btn btn-primary btn-lg"}
                      onClick={this.handleBtnApplyFilterClick}>Apply filter</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }

};

export default AnalyticsFilter;
