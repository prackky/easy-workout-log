import { expect } from 'chai';

import ewoloTestUtil from '../common/ewoloTestUtil';

import { segregateWorkoutsByMonth, getChartData, orderWorkoutsByDate } from './workoutsService';

const sordedWorkouts = [
  {
    id: 1,
    date: '2017-06-23'
  }, {
    id: 2,
    date: '2017-06-15'
  }, {
    id: 3,
    date: '2017-06-01'
  }, {
    id: 4,
    date: '2017-05-15'
  }, {
    id: 5,
    date: '2017-05-10'
  }, {
    id: 6,
    date: '2017-01-01'
  }, {
    id: 7,
    date: '2008-10-15'
  }, {
    id: 8,
    date: '2008-10-01'
  }, {
    id: 9,
    date: '2008-01-10'
  }, {
    id: 10,
    date: '2008-01-01'
  }
];

const workouts = {
  '1': {
    id: 1,
    date: '2017-06-23'
  },
  '2': {
    id: 2,
    date: '2017-06-15'
  },
  '3': {
    id: 3,
    date: '2017-06-01'
  },
  '4': {
    id: 4,
    date: '2017-05-15'
  },
  '5': {
    id: 5,
    date: '2017-05-10'
  },
  '6': {
    id: 6,
    date: '2017-01-01'
  },
  '7': {
    id: 7,
    date: '2008-10-15'
  },
  '8': {
    id: 8,
    date: '2008-10-01'
  },
  '9': {
    id: 9,
    date: '2008-01-10'
  },
  '10': {
    id: 10,
    date: '2008-01-01'
  }
};

describe('workoutsService', () => {

  describe('segregateWorkoutsByMonth', () => {
    it('should split workouts by month', () => {
      // when
      const segregatedWorkouts = segregateWorkoutsByMonth(sordedWorkouts);

      // then
      expect(segregatedWorkouts)
        .to
        .deep
        .equal([
          {
            key: 'June, 2017',
            workouts: [
              {
                id: 1,
                date: '2017-06-23'
              }, {
                id: 2,
                date: '2017-06-15'
              }, {
                id: 3,
                date: '2017-06-01'
              }
            ]
          }, {
            key: 'May, 2017',
            workouts: [
              {
                id: 4,
                date: '2017-05-15'
              }, {
                id: 5,
                date: '2017-05-10'
              }
            ]
          }, {
            key: 'January, 2017',
            workouts: [
              {
                id: 6,
                date: '2017-01-01'
              }
            ]
          }, {
            key: 'October, 2008',
            workouts: [
              {
                id: 7,
                date: '2008-10-15'
              }, {
                id: 8,
                date: '2008-10-01'
              }
            ]
          }, {
            key: 'January, 2008',
            workouts: [
              {
                id: 9,
                date: '2008-01-10'
              }, {
                id: 10,
                date: '2008-01-01'
              }
            ]
          }
        ]);
    });
  });

  describe('orderWorkoutsByDate', () => {
    it('should order all workouts linearly', () => {
      // when
      const orderedWorkouts = orderWorkoutsByDate(workouts);

      // then
      expect(orderedWorkouts)
        .to
        .deep
        .equal([
          {
            id: 1,
            date: '2017-06-23'
          }, {
            id: 2,
            date: '2017-06-15'
          }, {
            id: 3,
            date: '2017-06-01'
          }, {
            id: 4,
            date: '2017-05-15'
          }, {
            id: 5,
            date: '2017-05-10'
          }, {
            id: 6,
            date: '2017-01-01'
          }, {
            id: 7,
            date: '2008-10-15'
          }, {
            id: 8,
            date: '2008-10-01'
          }, {
            id: 9,
            date: '2008-01-10'
          }, {
            id: 10,
            date: '2008-01-01'
          }
        ]);
    });
  });

  describe('getChartData', () => {
    it('should get chart data', () => {
      // when
      const result = getChartData(ewoloTestUtil.workoutsAnalysisResponseData);

      // then
      result.rows.length = 1 // who wants to type up all the data?

      expect(result)
        .to
        .deep
        .equal({
          rows: [
            [new Date('2012-01-01'), 65]
          ],
          columns: [
            {
              type: 'date',
              label: 'Date'
            }, {
              type: 'number',
              label: 'Volume'
            }
          ]
        });
    });

    it('should get dummy rows when no data provided', () => {
      // when
      const result = getChartData([]);

      // then
      expect(result)
        .to
        .deep
        .equal({
          rows: [
            [new Date('2017-01-01'), 0]
          ],
          columns: [
            {
              type: 'date',
              label: 'Date'
            }, {
              type: 'number',
              label: 'Volume'
            }
          ]
        });
    });

  });

});
