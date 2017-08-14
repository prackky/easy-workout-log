import { c } from './globalActions';

export const initialState = {
  loadingCounter: 0,
  userNotifications: [],
  appNotification: {
    id: '',
    text: '',
    show: 'all'
  }
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TASK-START':
      {
        return {
          ...state,
          loadingCounter: state.loadingCounter + 1
        };
      }
    case 'TASK-END':
      {
        return {
          ...state,
          loadingCounter: state.loadingCounter - 1
        };
      }
    case 'USER-NOTIFICATION-ADD':
      {
        let userNotifications = [];

        if (action.markPreviousAsRead) {
          for (const userNotification of state.userNotifications) {
            userNotifications.push({
              ...userNotification,
              isRead: true
            });
          }
        } else {
          userNotifications = state.userNotifications;
        }

        return {
          ...state,
          userNotifications: [
            {
              type: action.userNotificationType,
              text: action.userNotificationText,
              isRead: false,
              at: action.at,
              id: action.id
            },
            ...userNotifications
          ]
        };
      }
    case 'USER-NOTIFICATION-UPDATE':
      {
        const id = action.id;
        const userNotifications = state.userNotifications;

        let index = -1;
        let userNotification = null;

        for (let i = 0; i < userNotifications.length; ++i) {
          if (userNotifications[i].id === id) {
            index = i;
            userNotification = userNotifications[i];
            break;
          }
        }

        if (index > -1) {
          return {
            ...state,
            userNotifications: [
            ...userNotifications.slice(0, index),
              {
                ...userNotification,
                isRead: action.isRead
            },
            ...userNotifications.slice(index + 1)
          ]
          };
        }

        return state;
      }
    case c.APP_NOTIFICATION_SET:
      {
        const { id, text, show } = action;

        return {
          ...state,
          appNotification: {
            id,
            text,
            show
          }
        };
      }
    default:
      return state;
  }
};

export default globalReducer;
