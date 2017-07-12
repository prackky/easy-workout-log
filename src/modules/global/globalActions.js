// import { push } from 'react-router-redux';

import ewoloUtil from '../../common/ewoloUtil';


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
  userNotificationAdd: (type, text, markPreviousAsRead = false) => {
    return {
      type: 'USER-NOTIFICATION-ADD',
      userNotificationType: type,
      userNotificationText: text,
      at: new Date(),
      markPreviousAsRead: markPreviousAsRead,
      id: ewoloUtil.chance.guid()
    };
  },
  userNotificationUpdate: (id, isRead) => {
    return {
      type: 'USER-NOTIFICATION-UPDATE',
      id,
      isRead
    };
  }
};

export default globalActions;
