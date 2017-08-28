import nock from 'nock';
import { expect } from 'chai';

import publikActions, { c } from './publikActions';
import ewoloConstants from '../../common/ewoloConstants';
import ewoloUtil from '../../common/ewoloUtil';

import ewoloTestUtil, { localStorageMock } from '../../common/ewoloTestUtil';
window.localStorage = localStorageMock;

const mockStore = ewoloTestUtil.getMockStore();

describe('publikActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates ' + c.PUBLIK_LINK_SET_DATA + ' when getting link data', async() => {
    // given
    const linkId = 'abc';

    nock(ewoloConstants.api.url)
      .get('/links/' + linkId)
      .reply(200, ewoloTestUtil.mock.savedWorkout);

    const expectedActions = [
      { type: 'TASK-START' },
      publikActions.linkSetData({ linkId, data: ewoloTestUtil.mock.savedWorkout }),
      { type: 'TASK-END' }
    ];

    const store = mockStore({});

    // when
    await store.dispatch(publikActions.linkFetchDataThunk(linkId));

    // then
    const actions = store.getActions();
    expect(store.getActions()).to.deep.equal(expectedActions);
  });
});
