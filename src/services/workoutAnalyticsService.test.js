import { expect } from 'chai';
import moment from 'moment';

import ewoloTestUtil from '../common/ewoloTestUtil';

import { getAnalyticsExerciseChartistSeriesData } from './workoutAnalyticsService';

const analyticsExerciseApiResponse = [
  {
    name: '6RM',
    data: [
      {
        date: '2017-01-03',
        weight: 200
      },
      {
        date: '2017-01-01',
        weight: 135
      }
    ]
  },
  {
    name: '7RM',
    data: [
      {
        date: '2017-01-02',
        weight: 135
      }
    ]
  },
  {
    name: '8RM',
    data: [
      {
        date: '2017-01-02',
        weight: 135
      },
      {
        date: '2017-01-01',
        weight: 225
      }
    ]
  }
];

describe('workoutAnalyticsService', () => {

  describe('getAnalyticsExerciseChartistSeriesData', () => {
    it('should convert api response to chartist series data', () => {
      // when
      const chartistSeriesData = getAnalyticsExerciseChartistSeriesData(analyticsExerciseApiResponse);

      // console.log(chartistSeriesData);

      // then
      expect(chartistSeriesData)
        .to
        .deep
        .equal([
          {
            name: '6RM',
            data: [
              {
                x: moment('2017-01-03').toDate(),
                y: 200
              },
              {
                x: moment('2017-01-01').toDate(),
                y: 135
              }
            ]
          },
          {
            name: '7RM',
            data: [
              {
                x: moment('2017-01-02').toDate(),
                y: 135
              }
            ]
          },
          {
            name: '8RM',
            data: [
              {
                x: moment('2017-01-02').toDate(),
                y: 135
              },
              {
                x: moment('2017-01-01').toDate(),
                y: 225
              }
            ]
          }
        ]);
    });
  });


});
