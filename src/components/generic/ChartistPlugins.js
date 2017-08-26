import React from 'react';

// import moment from 'moment';
import Chartist from 'chartist';
import './ChartistPlugins.css';

export function ctAxisTitle(options) {
  return function ctAxisTitle(chart) {

    var axisDefaults = {
      axisTitle: '',
      axisClass: 'ct-axis-title',
      offset: {
        x: 0,
        y: 0
      },
      textAnchor: 'middle',
      flipTitle: false
    };

    var defaultOptions = {
      xAxis: axisDefaults,
      yAxis: axisDefaults
    };

    options = Chartist.extend({}, defaultOptions, options);

    var getTitle = function (title) {
      if (title instanceof Function) {
        return title();
      }
      return title;
    };

    var getClasses = function (classes) {
      if (classes instanceof Function) {
        return classes();
      }
      return classes;
    };

    chart.on('created', function (data) {

      if (!options.axisX.axisTitle && !options.axisY.axisTitle) {
        throw new Error('ctAxisTitle plugin - You must provide at least one axis title');
      } else if (!data.axisX && !data.axisY) {
        throw new Error('ctAxisTitle plugin can only be used on charts that have at least one axis');
      }

      var xPos;
      var yPos;
      var title;

      //position axis X title
      if (options.axisX.axisTitle && data.axisX) {

        xPos = (data.axisX.axisLength / 2) + data.options.axisY.offset + data.options.chartPadding.left;

        yPos = data.options.chartPadding.top;

        if (data.options.axisY.position === 'end') {
          xPos -= data.options.axisY.offset;
        }

        if (data.options.axisX.position === 'end') {
          yPos += data.axisY.axisLength;
        }

        title = new Chartist.Svg("text");
        title.addClass(getClasses(options.axisX.axisClass));
        title.text(getTitle(options.axisX.axisTitle));
        title.attr({
          x: xPos + options.axisX.offset.x,
          y: yPos + options.axisX.offset.y,
          "text-anchor": options.axisX.textAnchor
        });

        data
          .svg
          .append(title, true);

      }

      //position axis Y title
      if (options.axisY.axisTitle && data.axisY) {
        xPos = 0;

        yPos = (data.axisY.axisLength / 2) + data.options.chartPadding.top;

        if (data.options.axisX.position === 'start') {
          yPos += data.options.axisX.offset;
        }

        if (data.options.axisY.position === 'end') {
          xPos = data.axisX.axisLength;
        }

        var transform = 'rotate(' + (options.axisY.flipTitle
          ? - 90
          : 90) + ', ' + xPos + ', ' + yPos + ')';

        title = new Chartist.Svg("text");
        title.addClass(getClasses(options.axisY.axisClass));
        title.text(getTitle(options.axisY.axisTitle));
        title.attr({
          x: xPos + options.axisY.offset.x,
          y: yPos + options.axisY.offset.y,
          transform: transform,
          "text-anchor": options.axisY.textAnchor
        });
        data
          .svg
          .append(title, true);
      }
    });
  };
};

// This plugin unfortunately tries to manage it's own elements and does
// integrate as smoothly as expected
// TODO: consider writing a pure react version rather than the watered down
// component
/*
export function legend(options) {

  var defaultOptions = {
    className: '',
    classNames: false,
    removeAll: false,
    legendNames: false,
    clickable: true,
    onClick: null,
    position: 'top'
  };


  function compareNumbers(a, b) {
    return a - b;
  }

  // Catch invalid options
  if (options && options.position) {
    if (!(options.position === 'top' || options.position === 'bottom' || options.position instanceof HTMLElement)) {
      throw Error('The position you entered is not a valid position');
    }
    if (options.position instanceof HTMLElement) {
      // Detatch DOM element from options object, because Chartist.extend currently chokes on circular references present in HTMLElements
      var cachedDOMPosition = options.position;
      delete options.position;
    }
  }

  options = Chartist.extend({}, defaultOptions, options);

  if (cachedDOMPosition) {
    // Reattatch the DOM Element position if it was removed before
    options.position = cachedDOMPosition
  }

  return function legend(chart) {
    var existingLegendElement = chart.container.querySelector('.ct-legend');
    if (existingLegendElement) {
      // Clear legend if already existing.
      existingLegendElement.parentNode.removeChild(existingLegendElement);
    }

    // Set a unique className for each series so that when a series is removed,
    // the other series still have the same color.
    if (options.clickable) {
      var newSeries = chart.data.series.map(function(series, seriesIndex) {
        if (typeof series !== 'object') {
          series = {
            value: series
          };
        }

        series.className = series.className || chart.options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex);
        return series;
      });
      chart.data.series = newSeries;
    }

    var legendElement = document.createElement('ul'),
      isPieChart = chart instanceof Chartist.Pie;
    legendElement.className = 'ct-legend';
    if (chart instanceof Chartist.Pie) {
      legendElement.classList.add('ct-legend-inside');
    }
    if (typeof options.className === 'string' && options.className.length > 0) {
      legendElement.classList.add(options.className);
    }

    if (chart.options.width) {
      legendElement.style.cssText = 'width: ' + chart.options.width + 'px;margin: 0 auto;';
    }

    var removedSeries = [],
      originalSeries = chart.data.series.slice(0);

    // Get the right array to use for generating the legend.
    var legendNames = chart.data.series,
      useLabels = isPieChart && chart.data.labels && chart.data.labels.length;
    if (useLabels) {
      var originalLabels = chart.data.labels.slice(0);
      legendNames = chart.data.labels;
    }
    legendNames = options.legendNames || legendNames;

    // Check if given class names are viable to append to legends
    var classNamesViable = (Array.isArray(options.classNames) && (options.classNames.length === legendNames.length));

    // Loop through all legends to set each name in a list item.
    legendNames.forEach(function(legend, i) {
      var li = document.createElement('li');
      li.className = 'ct-series-' + i;
      // Append specific class to a legend element, if viable classes are given
      if (classNamesViable) {
        li.className += ' ' + options.classNames[i];
      }
      li.setAttribute('data-legend', i);
      li.textContent = legend.name || legend;
      legendElement.appendChild(li);
    });

    chart.on('created', function(data) {
      // Append the legend element to the DOM
      if (!(options.position instanceof HTMLElement)) {
        switch (options.position) {
          case 'top':
            chart.container.insertBefore(legendElement, chart.container.childNodes[0]);
            break;

          case 'bottom':
            chart.container.insertBefore(legendElement, null);
            break;
        }
      } else {
        // Appends the legend element as the last child of a given HTMLElement
        options.position.insertBefore(legendElement, null);
      }
    });

    if (options.clickable) {
      legendElement.addEventListener('click', function(e) {
        var li = e.target;
        if (li.parentNode !== legendElement || !li.hasAttribute('data-legend'))
          return;
        e.preventDefault();

        var seriesIndex = parseInt(li.getAttribute('data-legend')),
          removedSeriesIndex = removedSeries.indexOf(seriesIndex);

        if (removedSeriesIndex > -1) {
          // Add to series again.
          removedSeries.splice(removedSeriesIndex, 1);
          li.classList.remove('inactive');
        } else {
          if (!options.removeAll) {
            // Remove from series, only if a minimum of one series is still visible.
            if (chart.data.series.length > 1) {
              removedSeries.push(seriesIndex);
              li.classList.add('inactive');
            }
            // Set all series as active.
            else {
              removedSeries = [];
              var seriesItems = Array.prototype.slice.call(legendElement.childNodes);
              seriesItems.forEach(function(item) {
                item.classList.remove('inactive');
              });
            }
          } else {
            // Remove series unaffected if it is the last or not
            removedSeries.push(seriesIndex);
            li.classList.add('inactive');
          }
        }

        // Reset the series to original and remove each series that
        // is still removed again, to remain index order.
        var seriesCopy = originalSeries.slice(0);
        if (useLabels) {
          var labelsCopy = originalLabels.slice(0);
        }

        // Reverse sort the removedSeries to prevent removing the wrong index.
        removedSeries.sort(compareNumbers).reverse();

        removedSeries.forEach(function(series) {
          seriesCopy.splice(series, 1);
          if (useLabels) {
            labelsCopy.splice(series, 1);
          }
        });

        if (options.onClick) {
          options.onClick(chart, e);
        }

        chart.data.series = seriesCopy;
        if (useLabels) {
          chart.data.labels = labelsCopy;
        }

        chart.update();
      });
    }

  };

};
*/

/*
export function ctPointLabels(options) {

  var defaultOptions = {
    labelClass: 'ct-label',
    labelOffset: {
      x: 0,
      y: -10
    },
    textAnchor: 'middle',
    align: 'center',
    labelInterpolationFnc: Chartist.noop,
    xAxisIsDate: true,
    xAxisShow: false
  };

  var labelPositionCalculation = {
    point: function(data) {
      return {
        x: data.x,
        y: data.y
      };
    },
    bar: {
      left: function(data) {
        return {
          x: data.x1,
          y: data.y1
        };
      },
      center: function(data) {
        return {
          x: data.x1 + (data.x2 - data.x1) / 2,
          y: data.y1
        };
      },
      right: function(data) {
        return {
          x: data.x2,
          y: data.y1
        };
      }
    }
  };


  options = Chartist.extend({}, defaultOptions, options);

  function addLabel(position, data) {
    var xValue = options.xAxisIsDate ? moment(data.value.x).format('YYYY-MM-DD') : data.value.x;

    xValue = options.xAxisShow ? xValue : undefined;

    // if x and y exist concat them otherwise output only the existing value
    var value = xValue !== undefined && data.value.y ?
      (xValue + ', ' + data.value.y) :
      data.value.y || xValue;

    data.group.elem('text', {
      x: position.x + options.labelOffset.x,
      y: position.y + options.labelOffset.y,
      style: 'text-anchor: ' + options.textAnchor
    }, options.labelClass).text(options.labelInterpolationFnc(value));
  }

  return function ctPointLabels(chart) {
    switch (chart.constructor.name) {
      case 'Line':
      case 'Bar':
        chart.on('draw', function(data) {
          var positonCalculator = (labelPositionCalculation[data.type] && labelPositionCalculation[data.type][options.align]) || labelPositionCalculation[data.type];
          if (positonCalculator) {
            addLabel(positonCalculator(data), data);
          }
        });
        break;
      default:
        // do nothing
    }
  };
};
*/

export function ctPointLabels(options) {
  return function ctPointLabels(chart) {

    var defaultOptions = {
      labelClass: 'ct-label',
      labelOffset: {
        x: 0,
        y: -10
      },
      textAnchor: 'middle'
    };

    options = Chartist.extend({}, defaultOptions, options);

    if (chart instanceof Chartist.Line) {
      chart
        .on('draw', function (data) {
          // console.log(data);
          if (data.type === 'point') {
            const value = Number.isInteger(data.value.y)
              ? data.value.y
              : data
                .value
                .y
                .toFixed(0);

            data
              .group
              .elem('text', {
                x: data.x + options.labelOffset.x,
                y: data.y + options.labelOffset.y,
                style: 'text-anchor: ' + options.textAnchor
              }, options.labelClass)
              .text(value);
          }
        });
    }
  }
}

export const ChartistLegend = (props) => {
  return (
    <ul className="ct-legend">
      {props
        .series
        .map((series, i) => {
          return (
            <li key={i} className={'ct-series-' + i} data-legend={i}>{series.name}</li>
          );
        })}
    </ul>
  );
}

export const getCtClassName = (width) => {
  if (width < 400) {
    return 'ct-square';
  }

  if (width < 600) {
    return 'ct-perfect-fourth';
  }

  return 'ct-major-tenth';
}