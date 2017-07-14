import nock from 'nock';
import { expect } from 'chai';

import globalActions from '../global/globalActions';
import accountActions, { c } from './accountActions';

import ewoloConstants from '../../common/ewoloConstants';
import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';

const mockStore = ewoloTestUtil.getMockStore();

describe('accountActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('accountPasswordUpdateThunk', () => {
    it('creates ' + c.ACCOUNT_PASSWORD_UPDATE_SUCCESS + ' when updating password', () => {

      /*
      nock(ewoloConstants.api.url)
        .post('/workouts')
        .reply(201, { id: 'xxx' });
      */

      const userNotificationAction = globalActions.userNotificationAdd('SUCCESS', 'Updated password', true);
      delete userNotificationAction.id;
      delete userNotificationAction.at;

      const expectedActions = [
        globalActions.taskStart(),
        accountActions.accountPasswordUpdateSuccess(),
        userNotificationAction,
        /*
        {
          type: '@@router/CALL_HISTORY_METHOD',
          payload: { method: 'push', args: ['/dashboard'] }
        },
        */
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
          delete actions[2].id;
          delete actions[2].at;

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });


  });

});
