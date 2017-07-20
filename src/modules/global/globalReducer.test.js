import { expect } from 'chai';

import globalReducer, { initialState } from './globalReducer';
import actions, { c } from './globalActions';

describe('globalReducer', () => {
  it('should reduce undefined state to initial state', () => {
    // when
    const newState = globalReducer(undefined, { type: '' });

    // then
    expect(newState)
      .to
      .deep
      .equal(initialState);
  });

  describe('TASK-START', () => {
    it('should increment the loading counter for TASK-START for an undefined state', () => {
      // when
      const newState = globalReducer(undefined, actions.taskStart());

      // then
      const expectedState = {
        ...initialState,
        loadingCounter: 1
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should increment the loading counter for TASK-START', () => {
      // when
      const newState = globalReducer({
        loadingCounter: 2
      }, actions.taskStart());

      // then
      expect(newState)
        .to
        .deep
        .equal({ loadingCounter: 3 });
    });
  });

  describe('TASK-END', () => {
    it('should decrement the loading counter for an undefined state', () => {
      // when
      const newState = globalReducer(undefined, actions.taskEnd());

      // then
      const expectedState = {
        ...initialState,
        loadingCounter: -1
      };

      expect(newState)
        .to
        .deep
        .equal(expectedState);
    });

    it('should decrement the loading counter', () => {
      // when
      const newState = globalReducer({
        loadingCounter: 2
      }, actions.taskEnd());

      // then
      expect(newState)
        .to
        .deep
        .equal({ loadingCounter: 1 });
    });
  });

  describe('USER-NOTIFICATION-ADD', () => {
    it('should add a user notification', () => {
      // when
      const now = new Date();
      const action = actions.userNotificationAdd('SUCCESS', 'yay!');
      action.at = now;
      action.id = 'xxx';

      const newState = globalReducer({
        userNotifications: []
      }, action);

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: 'yay!',
              isRead: false,
              at: now,
              id: 'xxx'
            }
          ]
        });
    });

    it('should add a user notification at the front of the queue', () => {
      // when
      const now = new Date();
      const action = actions.userNotificationAdd('SUCCESS', 'yay!');
      action.at = now;
      action.id = 'xxx';

      const newState = globalReducer({
        userNotifications: [{ text: '0', isRead: true }]
      }, action);

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: 'yay!',
              isRead: false,
              at: now,
              id: 'xxx'
            },
            {
              text: '0',
              isRead: true
            }
          ]
        });
    });

    it('should mark the other user notifications as seen', () => {
      // when
      const now = new Date();
      const action = actions.userNotificationAdd('SUCCESS', 'yay!', true);
      action.at = now;
      action.id = 'xxx';

      const newState = globalReducer({
        userNotifications: [{ text: '0', isRead: false }, { text: '1', isRead: false }]
      }, action);

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: 'yay!',
              isRead: false,
              at: now,
              id: 'xxx'
            },
            {
              text: '0',
              isRead: true
            },
            {
              text: '1',
              isRead: true
            }
          ]
        });
    });

  });

  describe('USER-NOTIFICATION-UPDATE', () => {
    it('should mark a user notification as read for the first notification', () => {
      // when
      const newState = globalReducer({
        userNotifications: [
          {
            type: 'SUCCESS',
            text: '0',
            isRead: false,
            id: '0'
          }, {
            type: 'SUCCESS',
            text: '1',
            isRead: false,
            id: 'xxx'
          }, {
            type: 'SUCCESS',
            text: '2',
            isRead: false,
            id: 'yyy'
          }
        ]
      }, actions.userNotificationUpdate('0', true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: '0',
              isRead: true,
              id: '0'
            }, {
              type: 'SUCCESS',
              text: '1',
              isRead: false,
              id: 'xxx'
            }, {
              type: 'SUCCESS',
              text: '2',
              isRead: false,
              id: 'yyy'
            }
          ]
        });
    });

    it('should not do anything if no matching notification', () => {
      // when
      const newState = globalReducer({
        userNotifications: [
          {
            type: 'SUCCESS',
            text: '0',
            isRead: false,
            id: '0'
          }, {
            type: 'SUCCESS',
            text: '1',
            isRead: false,
            id: 'xxx'
          }, {
            type: 'SUCCESS',
            text: '2',
            isRead: false,
            id: 'yyy'
          }
        ]
      }, actions.userNotificationUpdate('a', true));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          userNotifications: [
            {
              type: 'SUCCESS',
              text: '0',
              isRead: false,
              id: '0'
            }, {
              type: 'SUCCESS',
              text: '1',
              isRead: false,
              id: 'xxx'
            }, {
              type: 'SUCCESS',
              text: '2',
              isRead: false,
              id: 'yyy'
            }
          ]
        });
    });

  });

  describe(c.APP_NOTIFICATION_SET, () => {
    it('should set app notification data', () => {
      // when
      const newState = globalReducer(undefined, actions.appNotificationSet('a', 'xxx'));

      // then
      expect(newState)
        .to
        .deep
        .equal({
          ...initialState,
          appNotification: {
            id: 'a',
            text: 'xxx',
            showAll: true
          }
        });
    });

  });

});
