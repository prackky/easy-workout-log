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
const userWorkoutsProgressRoute = `/users/${userId}/workouts-progress`;
const workouts = [{ id: 1, date: moment().format('YYYY-MM-DD'), notes: 'abc' }];

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
        { type: 'TASK-START' }, {
          type: c.USER_WORKOUTS_FETCH_SUCCESS,
          workouts: workouts
        }, { type: 'TASK-END' }
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

  });

  describe('deleteUserWorkoutThunk', () => {

    it('should successfully delete user workouts', () => {
      const workoutId = '42';
      const workoutDate = 'sfdsf'

      nock(ewoloConstants.api.url)
        .delete(userWorkoutsRoute + '/' + workoutId)
        .reply(204);

      const expectedActions = [
        { type: 'TASK-START' },
        {
          type: c.USER_WORKOUTS_DELETE_SUCCESS,
          workoutId: workoutId
        },
        globalActions.userNotificationAdd('SUCCESS', `Deleted workout for ${workoutDate}`),
        { type: 'TASK-END' }
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
          delete actions[2].at;
          delete expectedActions[2].at;
          expect(actions).to.deep.equal(expectedActions);
        });
    });
  });

  describe('fetchUserWorkoutsProgressThunk', () => {
    it('should successfully fetch user workouts progress', () => {
      const workoutsProgress = ewoloTestUtil.workoutsProgressResponseData;
      
      nock(ewoloConstants.api.url)
        .get(userWorkoutsProgressRoute)
        .reply(200, workoutsProgress);

      const expectedActions = [
        { type: 'TASK-START' },
        userWorkoutsActions.userWorkoutsProgressFetchSuccess(workoutsProgress), 
        { type: 'TASK-END' }
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutsProgressThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(actions).to.deep.equal(expectedActions);
        });
    });

    it('should error when fetch user workouts progress for non-logged in user', () => {
      
      const expectedActions = [
        globalActions.userNotificationAdd('ERROR', 'Cannot fetch workout progress data because user is not logged in.')
      ];

      const store = mockStore({
        user: {
          data: {
            authToken: null
          }
        }
      });

      return store.dispatch(userWorkoutsActions.fetchUserWorkoutsProgressThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          delete expectedActions[0].at;
          delete actions[0].at;
          expect(actions).to.deep.equal(expectedActions);
        });
    });

  });

});
