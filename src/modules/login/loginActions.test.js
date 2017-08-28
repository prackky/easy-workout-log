import nock from 'nock';
import { expect } from 'chai';

import loginActions from './loginActions';
import globalActions from '../global/globalActions';
import userDataActions from '../user-data/userDataActions';
import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const mockStore = ewoloTestUtil.getMockStore();

describe('loginActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should successfully login and redirect', () => {
    nock(ewoloConstants.api.url)
      .post('/authenticate')
      .reply(200, { token: ewoloTestUtil.authToken });

    nock(ewoloConstants.api.url)
      .get('/user-data')
      .reply(200, { exerciseNames: [], name: 'snoop', email: 'snoop@dawg.yo', units: 7, sex: 15 });

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: 'USER-DATA-AUTH-SUCCESS',
        authToken: ewoloTestUtil.authToken,
        id: ewoloTestUtil.authTokenUserId
      },
      userDataActions.userDataSet(ewoloConstants.exerciseNames, [], 'snoop', 'snoop@dawg.yo', 7, 15),
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/xxx'] }
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      login: {
        email: 'vic@smalldata.tech',
        password: 'xxx',
        afterSuccess: {
          redirect: '/xxx'
        }
      }
    })

    return store.dispatch(loginActions.loginThunk())
      .then(() => { // return of async actions
        const actions = store.getActions();
        const authToken = ewoloUtil.getObject(ewoloConstants.storage.authTokenKey);
        expect(authToken).to.equal(ewoloTestUtil.authToken);
        expect(actions).to.deep.equal(expectedActions);
      });
  });

  it('should successfully login and follow through on action', () => {
    nock(ewoloConstants.api.url)
      .post('/authenticate')
      .reply(200, { token: ewoloTestUtil.authToken });

    nock(ewoloConstants.api.url)
      .get('/user-data')
      .reply(200, { exerciseNames: [], name: 'snoop', email: 'snoop@dawg.yo', units: 7, sex: 15 });

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: 'USER-DATA-AUTH-SUCCESS',
        authToken: ewoloTestUtil.authToken,
        id: ewoloTestUtil.authTokenUserId
      },
      userDataActions.userDataSet(ewoloConstants.exerciseNames, [], 'snoop', 'snoop@dawg.yo', 7, 15),
      {
        type: 'DO-SOMETHING-AFTER'
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      login: {
        email: 'vic@smalldata.tech',
        password: 'xxx',
        afterSuccess: {
          action: {
            type: 'DO-SOMETHING-AFTER'
          }
        }
      }
    })

    return store.dispatch(loginActions.loginThunk())
      .then(() => { // return of async actions
        const actions = store.getActions();
        expect(actions).to.deep.equal(expectedActions);
      });
  });

  it('should show an error message on invalid credentials', () => {
    nock(ewoloConstants.api.url)
      .post('/authenticate')
      .reply(401);

    const expectedActions = [
      { type: 'TASK-START' },
      ewoloTestUtil.cleanUpNotification(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Invalid username / password' })),
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      login: {
        email: 'vic@smalldata.tech',
        password: 'xxx'
      }
    });

    return store.dispatch(loginActions.loginThunk())
      .then(() => { // return of async actions
        const actions = store.getActions();
        ewoloTestUtil.cleanUpNotification(actions[1]);
        expect(actions).to.deep.equal(expectedActions);
      });
  });
});
