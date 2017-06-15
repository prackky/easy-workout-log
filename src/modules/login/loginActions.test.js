import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import loginActions from './loginActions';
import ewoloConstants from '../../common/ewoloConstants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('loginActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should successfully login and redirect', () => {
    nock(ewoloConstants.api.url)
      .post('/authenticate')
      .reply(200, { body: { authToken: 'blah' } });

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: 'USER-DATA-AUTH-SUCCESS',
        authToken: 'blah'
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/dashboard'] }
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      login: {
        email: 'vic@smalldata.tech',
        password: 'xxx',
        afterSuccess: {
          redirect: '/dashboard'
        }
      }
    })

    return store.dispatch(loginActions.login())
      .then(() => { // return of async actions
        const actions = store.getActions();
        expect(actions).to.deep.equal(expectedActions);
      });
  });

  it('should successfully login and follow through on action', () => {
    nock(ewoloConstants.api.url)
      .post('/authenticate')
      .reply(200, { body: { authToken: 'blah' } });

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: 'USER-DATA-AUTH-SUCCESS',
        authToken: 'blah'
      },
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

    return store.dispatch(loginActions.login())
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
      { type: 'USER-NOTIFICATION-ADD',
          userNotificationType: 'ERROR',
          userNotificationText: 'Invalid username / password',
          markPreviousAsRead: false },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      login: {
        email: 'vic@smalldata.tech',
        password: 'xxx'
      }
    });

    return store.dispatch(loginActions.login())
      .then(() => { // return of async actions
        const actions = store.getActions();
        delete actions[1].at;
        expect(actions).to.deep.equal(expectedActions);
      });
  });
});
