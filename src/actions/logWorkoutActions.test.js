import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';

import logWorkoutActions from './logWorkoutActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('logWorkoutActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates LOG-WORKOUT-SAVE-SUCCESS when saving a workout', () => {
    /*
    nock('http://example.com/')
      .get('/todos')
      .reply(200, { body: { todos: ['do something'] }});
    */

    const expectedActions = [
      { type: 'TASK-START' },
      { type: 'LOG-WORKOUT-SAVE-SUCCESS' },
      {
        type: 'USER-NOTIFICATION-ADD',
        userNotificationType: 'SUCCESS',
        userNotificationText: 'Saved workout for undefined',
        markPreviousAsRead: false
      },
      {
        type: '@@router/CALL_HISTORY_METHOD',
        payload: { method: 'push', args: ['/dashboard'] }
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({ user: { logWorkout: {} } })

    return store.dispatch(logWorkoutActions.logWorkoutSave())
      .then(() => { // return of async actions
        const actions = store.getActions();
        delete actions[2].at;

        expect(store.getActions()).to.deep.equal(expectedActions);
      });
  });
});
