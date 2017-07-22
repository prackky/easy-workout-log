import nock from 'nock';
import { expect } from 'chai';

import logWorkoutActions, { c } from './logWorkoutActions';

import ewoloConstants from '../../common/ewoloConstants';
import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const mockStore = ewoloTestUtil.getMockStore();

describe('logWorkoutActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('logWorkoutSaveThunk', () => {
    it('creates ' + c.LOG_WORKOUT_SAVE_SUCCESS + ' when creating a new workout for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .post('/workouts')
        .reply(201, { id: 'xxx' });

      const expectedActions = [
        { type: 'TASK-START' },
        {
          type: c.LOG_WORKOUT_SAVE_SUCCESS,
          id: 'xxx'
        },
        {
          type: 'USER-NOTIFICATION-ADD',
          userNotificationType: 'SUCCESS',
          userNotificationText: 'Saved workout for undefined',
          markPreviousAsRead: false
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        },
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: 'blah' } } })

      return store.dispatch(logWorkoutActions.logWorkoutSaveThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          delete actions[2].at;
          delete actions[2].id;

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates ' + c.LOG_WORKOUT_SAVE_SUCCESS + ' when editing a workout for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .put('/users/snoop/workouts/42')
        .reply(200, { id: 42 });

      const expectedActions = [
        { type: 'TASK-START' },
        {
          type: c.LOG_WORKOUT_SAVE_SUCCESS,
          id: 42
        },
        {
          type: 'USER-NOTIFICATION-ADD',
          userNotificationType: 'SUCCESS',
          userNotificationText: 'Saved workout for undefined',
          markPreviousAsRead: false
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/'] }
        },
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: { id: 42 }, data: { id: 'snoop', authToken: 'blah' } } })

      return store.dispatch(logWorkoutActions.logWorkoutSaveThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          delete actions[2].at;
          delete actions[2].id;
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
          type: c.LOG_WORKOUT_EDIT,
          workout: { id: 1 }
        },
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/log-workout'] }
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
