// import { push } from '../../react-router-redux/index';

import ewoloUtil from '../../common/ewoloUtil';

export const c = Object.freeze({
  APP_NOTIFICATION_SET: 'APP-NOTIFICATION-SET',
  USER_NOTIFICATION_ADD: 'USER-NOTIFICATION-ADD'
});

const globalActions = {
  taskStart: () => {
    return {
      type: 'TASK-START'
    };
  },
  taskEnd: () => {
    return {
      type: 'TASK-END'
    };
  },
  userNotificationAdd: ({ type, text, markPreviousAsRead = false, publicLinkId, publicLinkText }) => {
    return {
      type: c.USER_NOTIFICATION_ADD,
      userNotificationType: type,
      userNotificationText: text,
      at: new Date(),
      markPreviousAsRead: markPreviousAsRead,
      id: ewoloUtil.chance.guid(),
      publicLinkId,
      publicLinkText
    };
  },
  userNotificationUpdate: (id, isRead) => {
    return {
      type: 'USER-NOTIFICATION-UPDATE',
      id,
      isRead
    };
  },
  appNotificationSet: (id, text, show = 'all') => {
    return {
      type: c.APP_NOTIFICATION_SET,
      id,
      text,
      show
    };
  }
};

export default globalActions;
