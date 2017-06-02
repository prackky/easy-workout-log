// import { push } from 'react-router-redux';

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
  userNotificationAdd: (type, text) => {
    return {
      type: 'USER-NOTIFICATION-ADD',
      userNotificationType: type,
      userNotificationText: text
    };
  },
  userNotificationUpdate: (index, isRead) => {
    return {
      type: 'USER-NOTIFICATION-UPDATE',
      index: index,
      isRead: isRead
    };
  }
};

export default globalActions;
