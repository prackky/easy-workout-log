import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import moment from 'moment';

import userWorkoutsActions, {c} from './userWorkoutsActions';
import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';

import ewoloTestUtil, {localStorageMock} from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const userId = 'snoop';
const userWorkoutsRoute = '/users/' + userId + '/workouts';
const workouts = [{id: 1, date: moment().format('YYYY-MM-DD'), notes: 'abc'}];

describe('userWorkoutsActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should successfully fetch user workouts', () => {
    nock(ewoloConstants.api.url)
      .get(userWorkoutsRoute)
      .reply(200, workouts);

    const expectedActions = [
      { type: 'TASK-START' },
      {
        type: c.USER_WORKOUTS_FETCH_SUCCESS,
        workouts: workouts
      },
      { type: 'TASK-END' }
    ];

    const store = mockStore({
      user: {
        data: {
          authToken: 'blah',
          id: userId
        }
      }
    });

    return store.dispatch(userWorkoutsActions.fetchUserWorkoutsThunk())
      .then(() => { // return of async actions
        const actions = store.getActions();
        expect(actions).to.deep.equal(expectedActions);
      });
  });

});
