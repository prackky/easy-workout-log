import React from 'react';
import {connect} from 'react-redux';

import UserNotification from './UserNotification';

import './user-notification-bar.css';

import globalActions from '../../modules/global/globalActions';

const mapStateToProps = (state) => {
  return {userNotifications: state.global.userNotifications};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doUpdateUserNotification: (index, isRead) => {
      dispatch(globalActions.userNotificationUpdate(index, isRead));
    }
  };
};

const UserNotificationBar = (props) => {

  const renderUserNotifications = () => {
    return props
      .userNotifications
      .map((userNotification, index) => {
        return (<UserNotification
          key={index}
          index={index}
          doUpdateUserNotification={props.doUpdateUserNotification}
          userNotification={userNotification}/>);
      });
  }

  return (
    <div>
      <div className="container grid-480">
        {renderUserNotifications()}
      </div>

    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNotificationBar);
