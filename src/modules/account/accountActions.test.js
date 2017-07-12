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

  describe('accountUpdateThunk', () => {
    it('creates ' + c.ACCOUNT_UPDATE_SUCCESS + ' when updating account information', () => {

      /*
      nock(ewoloConstants.api.url)
        .post('/workouts')
        .reply(201, { id: 'xxx' });
      */

      const expectedActions = [
        globalActions.taskStart(),
        accountActions.accountUpdateSuccess(),
        globalActions.userNotificationAdd('SUCCESS', 'Updated account information', true),
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

      return store.dispatch(accountActions.accountUpdateThunk())
        .then(() => { // return of async actions
          const actions = store.getActions();
          delete actions[2].at;
          delete expectedActions[2].at;

          console.log(actions);

          expect(store.getActions()).to.deep.equal(expectedActions);
        });
    });


  });

});
