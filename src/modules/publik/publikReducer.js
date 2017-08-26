import ewoloUtil from '../../common/ewoloUtil';

import {c} from './publikActions';

export const initialState = {
  links: {}
};

const publikReducer = (state = initialState, action) => {
  switch (action.type) {
    case c.PUBLIK_LINK_SET_DATA:
      {
        const {linkId, data} = action;
        
        return {
          ...state,
          links: {
            ...state.links,
            linkId: data
          }
        };
        
      }
    default:
      return state;
  }
};

export default publikReducer;
