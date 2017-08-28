import { push } from '../react-router-redux/index';
import globalActions from '../modules/global/globalActions';

export class RequestError extends Error {
  constructor(response) {
    super(response.url + ' ' + response.status);
    this.response = response;
  }
};

export const getErrorCode = (error) => {
  if (error && error.response) { // apparently instanceof and error.constructor.name are both broken because of es6 class inheritance :(
    const r = error.response;
    // console.error([r.status, r.body.length ? r.body : '']);
    return r.status;
  }
  return 1;
}

export const handleError = ({ error, dispatch, notificationMessage, codeMessages }) => {
  const errorCode = getErrorCode(error);

  if (codeMessages && codeMessages[errorCode]) {
    dispatch(globalActions.userNotificationAdd({ type: 'ERROR', text: codeMessages[errorCode] }));
    return;
  }

  if (errorCode === 403) {
    dispatch(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Operation not permitted.' }));
    return;
  }

  if (errorCode === 401) {
    dispatch(globalActions.userNotificationAdd({ type: 'ERROR', text: 'Unauthorized to perform this action. Please try logging in again.' }));
    dispatch(push('/login'));
    return;
  }

  dispatch(globalActions.userNotificationAdd({ type: 'ERROR', text: notificationMessage }));
  console.error(error);
};
