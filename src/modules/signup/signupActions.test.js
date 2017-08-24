import nock from 'nock';
import { expect } from 'chai';

import signupActions from './signupActions';
import userDataActions from '../user-data/userDataActions';
import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const mockStore = ewoloTestUtil.getMockStore();

describe('signupActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SIGNUP-SUCCESS when signing up', () => {
    nock(ewoloConstants.api.url)
      .post('/users')
      .reply(201, { token: ewoloTestUtil.authToken });

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: 'USER-DATA-AUTH-SUCCESS',
        authToken: ewoloTestUtil.authToken,
        id: ewoloTestUtil.authTokenUserId
      },
      userDataActions.userDataSet(ewoloConstants.exerciseNames, [], 'vic', 'vic@smalldata.tech', 1, 1),
      {
        type: 'USER-NOTIFICATION-ADD',
        userNotificationType: 'SUCCESS',
        userNotificationText: 'Created account for vic@smalldata.tech',
        markPreviousAsRead: false
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/xxx'] }
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      signup: {
        email: 'vic@smalldata.tech',
        name: 'vic',
        afterSuccess: {
          redirect: '/xxx'
        }
      }
    })

    return store.dispatch(signupActions.signupThunk())
      .then(() => { // return of async actions
        const actions = store.getActions();
        ewoloTestUtil.cleanUpNotification(actions[3]);
        const authToken = ewoloUtil.getObject(ewoloConstants.storage.authTokenKey);
        expect(authToken).to.equal(ewoloTestUtil.authToken);
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
