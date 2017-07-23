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
    dispatch(globalActions.userNotificationAdd('ERROR', codeMessages[errorCode]));
    return;
  }

  if (errorCode === 403) {
    dispatch(globalActions.userNotificationAdd('ERROR', 'Operation not allowed.'));
    return;
  }

  dispatch(globalActions.userNotificationAdd('ERROR', notificationMessage));
  console.error(error);
};
