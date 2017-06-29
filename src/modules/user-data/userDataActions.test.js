import nock from 'nock';
import { expect } from 'chai';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
import ewoloConstants from '../../common/ewoloConstants';
import userDataActions, { c } from './userDataActions.js';

const mockStore = ewoloTestUtil.getMockStore();

describe('userDataActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchUserDataThunk', () => {
    it('creates ' + c.USER_DATA_FETCH_SUCCESS + ' with user data when fetching data for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .get('/user-data')
        .reply(200, { exerciseNames: [], name: 'snoop' });

      const expectedActions = [
        { type: 'TASK-START' },
        userDataActions.userDataFetchSuccess(ewoloConstants.exerciseNames, 'snoop'),
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

      const expectedActions = [
        {
          type: c.USER_DATA_FETCH_SUCCESS,
          exerciseNames: ewoloConstants.exerciseNames,
          name: undefined
        }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: null } } })

      return store.dispatch(userDataActions.fetchUserDataThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

  });

});
