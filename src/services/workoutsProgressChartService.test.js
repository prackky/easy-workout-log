import { expect } from 'chai';

import ewoloTestUtil from '../common/ewoloTestUtil';
import getChartData from './workoutsProgressChartService';

describe('getChartData', () => {
  it('should get chart data', () => {
    // when
    const result = getChartData(ewoloTestUtil.workoutsProgressResponseData);

    // then
    result.rows.length = 1 // who wants to type up all the data?

    expect(result)
      .to
      .deep
      .equal({
        rows: [[new Date('2012-01-01'), 65]],
        columns: [
          { type: 'date', label: 'Date' },
          { type: 'number', label: 'Volume' }
        ]
      });
  });

  it('should get dummy rows when do data provided', () => {
    // when
    const result = getChartData([]);

    // then
    expect(result)
      .to
      .deep
      .equal({
        rows: [[new Date('2017-01-01'), 0]],
        columns: [
          { type: 'date', label: 'Date' },
          { type: 'number', label: 'Volume' }
        ]
      });
  });


});
