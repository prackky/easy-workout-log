import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import ewoloConstants from '../../common/ewoloConstants';
import userDataActions, { c } from './userDataActions.js';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('userDataActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchUserDataThunk', () => {
    it('creates ' + c.USER_DATA_FETCH_SUCCESS + ' with user data when fetching data for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .get('/user-data')
        .reply(200, { exerciseNames: [] });

      const expectedActions = [
        { type: 'TASK-START' },
        userDataActions.userDataFetchSuccess(ewoloConstants.exerciseNames),
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: 'blah' } } })

      return store.dispatch(userDataActions.fetchUserDataThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          // console.log(actions);
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates ' + c.USER_DATA_FETCH_SUCCESS + ' with seed data when fetching data for a non-logged in user', () => {

      nock(ewoloConstants.api.url)
        .get('/user-data')
        .reply(200, { exerciseNames: ewoloConstants.exerciseNames });

      const expectedActions = [
        {
          type: c.USER_DATA_FETCH_SUCCESS,
          exerciseNames: ewoloConstants.exerciseNames
        }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: null } } })

      return store.dispatch(userDataActions.fetchUserDataThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          // console.log(actions);
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

  });

});
