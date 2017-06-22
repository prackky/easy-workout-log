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

  describe('fetchUserData', () => {
    it('creates ' + c.USER_DATA_FETCH_SUCCESS + ' with user data when fetching data for a logged in user', () => {
      /*
      nock('http://example.com/')
        .get('/todos')
        .reply(200, { body: { todos: ['do something'] }});
      */

      const expectedActions = [
        { type: 'TASK-START' },
        {
          type: c.USER_DATA_FETCH_SUCCESS,
          exerciseNames: ewoloConstants.exerciseNames
        },
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: 'blah' } } })

      return store.dispatch(userDataActions.fetchUserData())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates ' + c.USER_DATA_FETCH_SUCCESS + ' with seed data when fetching data for a non-logged in user', () => {
      /*
      nock('http://example.com/')
        .get('/todos')
        .reply(200, { body: { todos: ['do something'] }});
      */

      const expectedActions = [
        {
          type: c.USER_DATA_FETCH_SUCCESS,
          exerciseNames: ewoloConstants.exerciseNames
        }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: null } } })

      return store.dispatch(userDataActions.fetchUserData())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

  });
  
});
