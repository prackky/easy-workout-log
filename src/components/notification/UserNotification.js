import React from 'react';

const UserNotification = (props) => {

  const handleClearNotification = (event) => {
    event.preventDefault();
    props.doUpdateUserNotification(props.index, true);
  };

  return (
    <div className="column col-sm-12">
      <div className="toast toast-success user-notification">
        <button className="btn btn-clear float-right" onClick={handleClearNotification}></button>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </div>
    </div>
  );
}

export default UserNotification;
