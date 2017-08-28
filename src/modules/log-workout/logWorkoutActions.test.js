import nock from 'nock';
import { expect } from 'chai';

import logWorkoutActions, { c } from './logWorkoutActions';
import globalActions from '../global/globalActions';
import userDataActions, { c as userDataActionConstants } from '../user-data/userDataActions';

import ewoloConstants from '../../common/ewoloConstants';
import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const mockStore = ewoloTestUtil.getMockStore();

describe('logWorkoutActions', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  const logWorkoutDate = '2017-01-03';

  const successUserNotification = ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'SUCCESS', text: `Saved workout for ${logWorkoutDate}`, publicLink: { id: 'publicLinkId', type: 'workout-details', workoutDate: logWorkoutDate } }));

  describe('logWorkoutSaveThunk', () => {
    it('creates ' + c.LOG_WORKOUT_SAVE_SUCCESS + ' when creating a new workout for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .post('/workouts')
        .reply(201, { id: 'xxx' });

      nock(ewoloConstants.api.url)
        .post('/links/workout-details')
        .reply(201, { id: 'publicLinkId' });

      nock(ewoloConstants.api.url)
        .get('/user-data')
        .reply(200, { exerciseNames: [], name: 'vic', email: 'vic', units: 1, sex: 1 });

      const expectedActions = [
        { type: 'TASK-START' },
        {
          type: c.LOG_WORKOUT_SAVE_SUCCESS,
          id: 'xxx'
        },
        successUserNotification,
        userDataActions.userDataSet(ewoloConstants.exerciseNames, [], 'vic', 'vic', 1, 1),
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        },
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: { date: logWorkoutDate }, data: { authToken: 'blah' } } })

      return store.dispatch(logWorkoutActions.logWorkoutSaveThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          ewoloTestUtil.cleanUpNotification(actions[2]);

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates ' + c.LOG_WORKOUT_SAVE_SUCCESS + ' when editing a workout for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .put('/users/snoop/workouts/42')
        .reply(200, { id: 42 });

      nock(ewoloConstants.api.url)
        .post('/links/workout-details')
        .reply(201, { id: 'publicLinkId' });

      nock(ewoloConstants.api.url)
        .get('/user-data')
        .reply(200, { exerciseNames: [], name: 'vic', email: 'vic', units: 1, sex: 1 });

      const expectedActions = [
        { type: 'TASK-START' },
        {
          type: c.LOG_WORKOUT_SAVE_SUCCESS,
          id: 42
        },
        successUserNotification,
        userDataActions.userDataSet(ewoloConstants.exerciseNames, [], 'vic', 'vic', 1, 1),
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        },
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: { id: 42, date: logWorkoutDate }, data: { id: 'snoop', authToken: 'blah' } } })

      return store.dispatch(logWorkoutActions.logWorkoutSaveThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          // console.log(actions);
          ewoloTestUtil.cleanUpNotification(actions[2]);
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('redirects to /signup when saving a workout for non-logged in user', () => {
      const expectedActions = [
        {
          type: 'SIGNUP-SET-AFTER-SUCCESS',
          redirect: '/'
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/signup'] }
        }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: undefined } } })

      return store.dispatch(logWorkoutActions.logWorkoutSaveThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          delete actions[0].action;
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });

  describe('logWorkoutCopyThunk', () => {
    it('creates ' + c.LOG_WORKOUT_COPY + ' when copying a workout', () => {

      const expectedActions = [
        {
          type: c.LOG_WORKOUT_COPY,
          workout: { id: 1 }
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/log-workout'] }
        }
      ];

      const store = mockStore({ user: { logWorkout: {} } });

      return store.dispatch(logWorkoutActions.logWorkoutCopyThunk({ id: 1 }))
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });

  describe('logWorkoutEditThunk', () => {
    it('creates ' + c.LOG_WORKOUT_EDIT + ' when editing a workout', () => {

      const expectedActions = [
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/edit-workout/1'] }
        }
      ];

      const store = mockStore({ user: { logWorkout: {} } });

      return store.dispatch(logWorkoutActions.logWorkoutEditThunk({ id: 1 }))
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });
});
