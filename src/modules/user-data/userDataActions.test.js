import nock from 'nock';
import { expect } from 'chai';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
import ewoloConstants from '../../common/ewoloConstants';
import userDataActions, { c } from './userDataActions.js';
import globalActions from '../global/globalActions';

const mockStore = ewoloTestUtil.getMockStore();

describe('userDataActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchUserDataThunk', () => {
    it('creates ' + c.USER_DATA_SET + ' with user data when fetching data for a logged in user', () => {

      nock(ewoloConstants.api.url)
        .get('/user-data')
        .reply(200, { exerciseNames: [], name: 'snoop', email: 'snoop@dawg.yo', units: 7, sex: 15 });

      const expectedActions = [
        { type: 'TASK-START' },
        userDataActions.userDataSet(ewoloConstants.exerciseNames, 'snoop', 'snoop@dawg.yo', 7, 15),
        { type: 'TASK-END' }
      ];

      const store = mockStore({ user: { logWorkout: {}, data: { authToken: 'blah' } } })

      return store.dispatch(userDataActions.fetchUserDataThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });

    it('creates ' + c.USER_DATA_SET + ' with seed data when fetching data for a non-logged in user', () => {

      const expectedActions = [
        {
          type: c.USER_DATA_SET,
          exerciseNames: ewoloConstants.exerciseNames,
          name: undefined,
          email: undefined,
          units: undefined,
          sex: undefined
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
