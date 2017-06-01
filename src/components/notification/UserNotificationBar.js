import React from 'react';

import UserNotification from './UserNotification';

import './user-notification-bar.css';

const UserNotificationBar = (props) => {

  return (
    <div>
      <div className="container grid-480">
        <div className="columns">

          <UserNotification/>

        </div>
      </div>

    </div>
  );
}

export default UserNotificationBar;
