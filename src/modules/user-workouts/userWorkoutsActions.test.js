import nock from 'nock';
import { expect } from 'chai';
import moment from 'moment';

import globalActions from '../global/globalActions';
import userWorkoutsActions, { c } from './userWorkoutsActions';
import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const mockStore = ewoloTestUtil.getMockStore();

const userId = 'snoop';
const userWorkoutsRoute = `/users/${userId}/workouts`;
const userWorkoutsAnalysisRoute = `/users/${userId}/analysis/workouts?units=`;
const workouts = [{ id: 1, date: ewoloUtil.getTodaysDate(), notes: 'abc' }];

describe('userWorkoutsActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchUserWorkoutsThunk', () => {
    it('should successfully fetch user workouts', () => {
      nock(ewoloConstants.api.url)
        .get(userWorkoutsRoute)
        .reply(200, workouts);

      const expectedActions = [
        globalActions.taskStart(),
        userWorkoutsActions.userWorkoutsFetchSuccess(workouts),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutsThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(actions).to.deep.equal(expectedActions);
        });
    });

    it('should successfully fetch user workouts when dateBefore provided', () => {
      const dateBefore = '2017-01-02';
      const route = userWorkoutsRoute + '?dateBefore=2017-01-01';

      nock(ewoloConstants.api.url)
        .get(route)
        .reply(200, workouts);

      const expectedActions = [
        globalActions.taskStart(),
        userWorkoutsActions.userWorkoutsFetchSuccess(workouts),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutsThunk(dateBefore))
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(actions).to.deep.equal(expectedActions);
        });
    });

  });

  describe('fetchUserWorkoutThunk', () => {
    it('should successfully fetch user workout', () => {
      const workout = { id: 42, date: '2001-01-01' };
      const route = userWorkoutsRoute + `/${workout.id}`;

      nock(ewoloConstants.api.url)
        .get(route)
        .reply(200, workout);

      const expectedActions = [
        globalActions.taskStart(),
        userWorkoutsActions.userWorkoutsFetchSuccess([workout]),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutThunk(userId, workout.id))
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(actions).to.deep.equal(expectedActions);
        });
    });

    it('should redirect to login when token expired', async() => {
      const workout = { id: 42, date: '2001-01-01' };
      const route = userWorkoutsRoute + `/${workout.id}`;

      nock(ewoloConstants.api.url)
        .get(route)
        .reply(401);

      const expectedActions = [
        globalActions.taskStart(),
        ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Unauthorized to perform this action. Please try logging in again.' })),
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/login'] }
        },
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      await store.dispatch(userWorkoutsActions.fetchUserWorkoutThunk(userId, workout.id));

      const actions = store.getActions();
      ewoloTestUtil.cleanUpNotification(actions[1]);
      expect(actions).to.deep.equal(expectedActions);
    });

    it('should show 403 error', async() => {
      const workout = { id: 42, date: '2001-01-01' };
      const route = userWorkoutsRoute + `/${workout.id}`;

      nock(ewoloConstants.api.url)
        .get(route)
        .reply(403);

      const expectedActions = [
        globalActions.taskStart(),
        ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Operation not permitted.' })),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      await store.dispatch(userWorkoutsActions.fetchUserWorkoutThunk(userId, workout.id));

      const actions = store.getActions();
      ewoloTestUtil.cleanUpNotification(actions[1]);
      expect(actions).to.deep.equal(expectedActions);
    });

  });

  describe('deleteUserWorkoutThunk', () => {

    it('should successfully delete user workouts', () => {
      const workoutId = '42';
      const workoutDate = 'sfdsf'

      nock(ewoloConstants.api.url)
        .delete(userWorkoutsRoute + '/' + workoutId)
        .reply(204);

      const expectedActions = [
        globalActions.taskStart(),
        userWorkoutsActions.userWorkoutsDeleteSuccess(workoutId),
        ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'SUCCESS', text: `Deleted workout for ${workoutDate}` })),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      return store.dispatch(userWorkoutsActions.deleteUserWorkoutThunk(workoutId, workoutDate))
        .then(() => { // return of async actions
          const actions = store.getActions();
          ewoloTestUtil.cleanUpNotification(actions[2]);
          expect(actions).to.deep.equal(expectedActions);
        });
    });
  });

  describe('fetchUserWorkoutsAnalysisThunk', () => {
    it('should successfully fetch user workouts analysis', () => {
      const workoutsAnalysis = ewoloTestUtil.workoutsAnalysisResponseData;

      nock(ewoloConstants.api.url)
        .get(userWorkoutsAnalysisRoute + '6')
        .reply(200, workoutsAnalysis);

      const expectedActions = [
        globalActions.taskStart(),
        userWorkoutsActions.userWorkoutsAnalysisFetchSuccess(workoutsAnalysis),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId,
            units: 6
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutsAnalysisThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(actions).to.deep.equal(expectedActions);
        });
    });

    it('should error when fetch user workouts analysis for non-logged in user', () => {

      const expectedActions = [
        ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Cannot fetch workout progress data because user is not logged in.' }))
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: null
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutsAnalysisThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          ewoloTestUtil.cleanUpNotification(actions[0]);
          expect(actions).to.deep.equal(expectedActions);
        });
    });

  });

});
