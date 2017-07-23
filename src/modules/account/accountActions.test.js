import nock from 'nock';
import { expect } from 'chai';

import globalActions from '../global/globalActions';
import accountActions, { c } from './accountActions';
import userDataActions, { c as userDataActionConstants } from '../user-data/userDataActions';

import ewoloConstants from '../../common/ewoloConstants';
import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';

const mockStore = ewoloTestUtil.getMockStore();

describe('accountActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('accountPasswordUpdateThunk', () => {
    it('creates ' + c.ACCOUNT_PASSWORD_UPDATE_SUCCESS + ' when updating password', () => {

      nock(ewoloConstants.api.url)
        .post('/credentials')
        .reply(200, { id: 'xxx' });

      const userNotificationAction = ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd('SUCCESS', 'Updated password', true));
      

      const expectedActions = [
        globalActions.taskStart(),
        accountActions.accountPasswordUpdateSuccess(),
        userNotificationAction,
        globalActions.taskEnd()
      ];

      const store = mockStore({
        account: {
          name: 'abc',
          oldPassword: 'xxx',
          password: 'yyy'
        },
        user: {
          logWorkout: {},
          data: {
            authToken: 'blah'
          }
        }
      });

      return store.dispatch(accountActions.accountPasswordUpdateThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          ewoloTestUtil.cleanUpNotification(actions[2]);

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });

  describe('accountDataUpdateThunk', () => {
    it('creates ' + userDataActionConstants.USER_DATA_SET + ' when updating account data', () => {

      const userId = 'xxx';

      nock(ewoloConstants.api.url)
        .put('/users/' + userId)
        .reply(204);

      const userNotificationAction = globalActions.userNotificationAdd('SUCCESS', 'Updated account settings', true);
      delete userNotificationAction.id;
      delete userNotificationAction.at;

      const expectedActions = [
        globalActions.taskStart(),
        userDataActions.userDataSet(['squats'], 'xyz', 'a@a.com', 3),
        userNotificationAction,
        globalActions.taskEnd()
      ];

      const store = mockStore({
        account: {
          name: 'xyz',
          units: 3
        },
        user: {
          logWorkout: {},
          data: {
            authToken: 'blah',
            id: userId,
            exerciseNames: ['squats'],
            email: 'a@a.com'
          }
        }
      });

      return store.dispatch(accountActions.accountDataUpdateThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          delete actions[2].id;
          delete actions[2].at;

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
  });

  /*
  describe('accountDataFetchThunk', () => {
    it('creates ' + c.ACCOUNT_SET_DATA + ' when fetching account data', () => {

      const userId = 'xxx';
      const data = { name: 'yoyo ma', units: 2 };

      nock(ewoloConstants.api.url)
        .get('/users/' + userId)
        .reply(200, data);

      const expectedActions = [
        globalActions.taskStart(),
        accountActions.accountSetData(data),
        globalActions.taskEnd()
      ];

      const store = mockStore({
        account: {
          name: 'abc',
          units: 435
        },
        user: {
          logWorkout: {},
          data: {
            authToken: 'blah',
            id: userId
          }
        }
      });

      return store.dispatch(accountActions.accountDataFetchThunk(false))
        .then(() => { // return of async actions
          const actions = store.getActions();
          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });
    
  });
  */
});
