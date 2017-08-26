import { expect } from 'chai';

import publikReducer, { initialState } from './publikReducer';
import actions, { c } from './publikActions';

describe('publikReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = publikReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe(c.PUBLIK_LINK_SET_DATA, () => {
    it('should set data', () => {
      // given
      const linkId = 'abc';
      const data = { snoop: 'dawg' };

      // when
      const newState = publikReducer(undefined, actions.linkSetData({ linkId, data }));

      // then
      const expectedState = {
        ...initialState,
        links: {
          linkId: data
        }
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

  });
});
