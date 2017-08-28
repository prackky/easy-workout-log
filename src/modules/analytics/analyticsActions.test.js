import nock from 'nock';
import { expect } from 'chai';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
import ewoloConstants from '../../common/ewoloConstants';
import analyticsActions, { c } from './analyticsActions';
import globalActions, { c as globalActionConstants } from '../global/globalActions';

const mockStore = ewoloTestUtil.getMockStore();

describe('analyticsActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('analyticsExerciseFetchDataThunk', () => {
    it('creates ' + c.ANALYTICS_EXERCISE_SET_DATA + ' with exercise data for a logged in user', () => {

      const userId = 'snoop';
      const exerciseName = 'squats';
      const responseData = [{ snoop: 'dawg' }];

      nock(ewoloConstants.api.url)
        .get('/users/' + userId + '/analysis/exercise')
        .query({
          units: 1,
          exerciseName: exerciseName
        })
        .reply(200, responseData);

      const expectedActions = [
        { type: 'TASK-START' },
        analyticsActions.analyticsExerciseSetData(exerciseName, responseData),
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { data: { authToken: 'blah', id: userId, units: 1 } } })

      return store.dispatch(analyticsActions.analyticsExerciseFetchDataThunk(exerciseName))
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates ' + globalActionConstants.USER_NOTIFICATION_ADD + ' with an error message when fetching data for a non-logged in user', () => {

      const expectedActions = [
        ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Cannot fetch analytics data because user is not logged in.' })),
      ];

      const store = mockStore({ user: { data: { authToken: null } } })

      return store.dispatch(analyticsActions.analyticsExerciseFetchDataThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          ewoloTestUtil.cleanUpNotification(actions[0]);
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

  });

});
