import React from 'react';
import moment from 'moment';

const UserNotification = (props) => {

  const handleClearNotification = (event) => {
    event.preventDefault();
    props.doUpdateUserNotification(props.index, true);
  };

  const getNotificationClassName = (type) => {
    if (type === 'SUCCESS') {
      return 'toast-success';
    } else if (type === 'ERROR') {
      return 'toast-error';
    }

    return '';
  };

  if (props.userNotification.isRead) {
    return null;
  }

  return (
    <div className="columns">
      <div className="column col-xs-12">
        <div
          className={"toast user-notification " + getNotificationClassName(props.userNotification.type)}>
          <button className="btn btn-clear float-right" onClick={handleClearNotification}></button>
          <div>
            {props.userNotification.text}
          </div>
          <div className="notification-timestamp">
            {moment(props.userNotification.at).fromNow()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserNotification;
