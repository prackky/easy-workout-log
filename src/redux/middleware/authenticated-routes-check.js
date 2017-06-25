import { push } from 'react-router-redux';

const authenticatedRoutesCheck = ({ dispatch, getState }) => next => action => {

  if ('@@router/LOCATION_CHANGE' === action.type) {
    if (action.payload.pathname === '/dashboard') {
      if (!getState().user.data.authToken) {
        console.log('Attempting to access authenticated resource');
        dispatch(push('/'));
        return;
      }
    } else if (
      action.payload.pathname === '/signup' ||
      action.payload.pathname === '/login'
    ) {
      if (getState().user.data.authToken) {
        console.log('Attempting to access authentication resources when already authenticated');
        dispatch(push('/'));
        return;
      }
    }
  }

  return next(action);
};

export default authenticatedRoutesCheck;
