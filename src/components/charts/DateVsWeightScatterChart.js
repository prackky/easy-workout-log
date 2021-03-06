import React from 'react';
import {Chart} from 'react-google-charts';

import ewoloUtil from '../../common/ewoloUtil';

class DateVsWeightScatterChart extends React.Component {
  constructor(props) {
    super(props);

    // https://github.com/RakanNimer/react-google-charts/issues/145
    // using 'Arial' here will get rid of the error: Not enough columns given to draw the requested chart.
    const globalFontName = 'Lato';
    const textStyle = {
      fontName: globalFontName
    };

    this.state = {
      options: {
        // title: 'Date vs. Weight comparison',
        titleTextStyle: textStyle,
        hAxis: {
          title: 'Date',
          viewWindowMode: 'pretty',
          textStyle: textStyle,
          titleTextStyle: textStyle
        },
        vAxis: {
          title: `Weight (${ewoloUtil.unitsToText(props.units)})`,
          viewWindowMode: 'pretty',
          textStyle: textStyle,
          titleTextStyle: textStyle
        },
        legend: {
          position: 'top',
          textStyle: textStyle
        },
        tooltip: {
          textStyle: textStyle
        },
        trendlines: {
          0: {
            type: 'linear',
            color: 'blue',
            lineWidth: 3,
            opacity: 0.3,
            showR2: false,
            visibleInLegend: false
          }
        }
        // ,explorer: {} // enable panning and zooming
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.units !== this.props.units) {
      const newState = this.state;
      newState.options.vAxis.title = `Weight (${ewoloUtil.unitsToText(nextProps.units)})`;
      this.setState(newState);
    }
  }

  render() {
    return (<Chart
      chartType="ScatterChart"
      rows={this.props.rows}
      columns={this.props.columns}
      options={this.state.options}
      graph_id="ScatterChart"
      width="100%"
      height="400px"
      chartEvents={this.props.chartEvents}/>);
  }
}

export default DateVsWeightScatterChart;
