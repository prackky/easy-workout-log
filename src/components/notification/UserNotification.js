import React from 'react';

import './user-notification.css';

const UserNotification = (props) => {

  const renderUserNotification = () => {
    return (
      <div id="user-notification">
        bla bla
      </div>
    );
  };

  return (
    <div>
      <div className="container grid-960">
        <div className="columns">
          <div className="column col-sm-12">
            {renderUserNotification()}
          </div>
        </div>
      </div>

    </div>
  );
}

export default UserNotification;
