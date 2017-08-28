// import { push } from '../../react-router-redux/index';

import ewoloUtil from '../../common/ewoloUtil';
// import ewoloConstants from '../../common/ewoloConstants';
import { handleError } from '../../common/errorHandler';

import globalActions from '../global/globalActions';

export const c = Object.freeze({
  PUBLIK_LINK_SET_DATA: 'PUBLIK-LINK-SET-DATA'
});


const publikActions = {
  linkSetData: ({ linkId, data }) => {
    return {
      type: c.PUBLIK_LINK_SET_DATA,
      linkId,
      data
    };
  },
  linkCreateAsync: ({linkType, authToken, userId, workoutId }) => {
    const promise = ewoloUtil.getApiRequest({
      route: `/links/${linkType}`,
      method: 'POST',
      body: { userId, workoutId },
      authToken: authToken
    });

    return promise
      .then(ewoloUtil.getApiResponse)
      .then(body => {
        return body;
      });
  },
  linkFetchDataThunk: (linkId) => {
    return (dispatch, getState) => {

      dispatch(globalActions.taskStart());

      const promise = ewoloUtil.getApiRequest({
        route: `/links/${linkId}`,
        method: 'GET'
      });

      return promise
        .then(ewoloUtil.getApiResponse)
        .then(body => {
          dispatch(publikActions.linkSetData({ linkId, data: body }));
        })
        .catch(error => {
          handleError({
            error,
            dispatch,
            notificationMessage: 'An error occured when getting data for ' + linkId
          });
        })
        .then(() => { // poor man's substitute for finally
          dispatch(globalActions.taskEnd());
        });
    };
  }
};

export default publikActions;
