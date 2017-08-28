// import ewoloUtil from '../../common/ewoloUtil';

import { c } from './publikActions';

export const initialState = {
  links: {}
};

const publikReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.PUBLIK_LINK_SET_DATA:
      {
        const { linkId, data } = action;

        const links = {
          ...state.links
        }
        links[linkId] = data;

        return {
          ...state,
          links
        };

      }
    default:
      return state;
  }
};

export default publikReducer;
