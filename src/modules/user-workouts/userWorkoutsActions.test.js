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
const userWorkoutsAnalysisRoute = `/users/${userId}/analysis/workouts`;
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
        globalActions.userNotificationAdd('SUCCESS', `Deleted workout for ${workoutDate}`),
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
          delete actions[2].at;
          delete actions[2].id;
          delete expectedActions[2].at;
          delete expectedActions[2].id;
          expect(actions).to.deep.equal(expectedActions);
        });
    });
  });

  describe('fetchUserWorkoutsAnalysisThunk', () => {
    it('should successfully fetch user workouts analysis', () => {
      const workoutsAnalysis = ewoloTestUtil.workoutsAnalysisResponseData;
      
      nock(ewoloConstants.api.url)
        .get(userWorkoutsAnalysisRoute)
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
            id: userId
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
        globalActions.userNotificationAdd('ERROR', 'Cannot fetch workout progress data because user is not logged in.')
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
          delete expectedActions[0].at;
          delete expectedActions[0].id;
          delete actions[0].at;
          delete actions[0].id;
          expect(actions).to.deep.equal(expectedActions);
        });
    });

  });

});
