import { expect } from 'chai';

import * as entityService from './entityService';

const workouts = [
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

describe('entityService', () => {

  describe('normalize', () => {
    it('should normalize by id', () => {
      // when
      const normalizedWorkouts = entityService.normalize(workouts);

      // then
      expect(normalizedWorkouts)
        .to
        .deep
        .equal({
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
        });
    });
  });

});
