import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import signupActions from './signupActions';
import ewoloConstants from '../ewoloConstants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('signupActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates SIGNUP-SUCCESS when signing up', () => {
    nock(ewoloConstants.api.url)
      .post('/users')
      .reply(201, { body: { authToken: 'blah' } });

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: 'USER-DATA-AUTH-SUCCESS',
        authToken: 'blah'
      },
      {
        type: 'USER-NOTIFICATION-ADD',
        userNotificationType: 'SUCCESS',
        userNotificationText: 'Created account for vic@smalldata.tech',
        markPreviousAsRead: false
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/dashboard'] }
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      signup: {
        email: 'vic@smalldata.tech',
        afterSuccess: {
          redirect: '/dashboard'
        }
      }
    })

    return store.dispatch(signupActions.signup())
      .then(() => { // return of async actions
        const actions = store.getActions();
        delete actions[2].at;
        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
