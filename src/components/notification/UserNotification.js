import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

import ewoloUtil from '../../common/ewoloUtil';

const getNotificationClassName = (type) => {
  if (type === 'SUCCESS') {
    return 'toast-success';
  } else if (type === 'ERROR') {
    return 'toast-error';
  }

  return '';
};

class UserNotification extends Component {

  constructor(props) {
    super(props);
    this.refUserNotification = `user-notification-${props.index}`;
  }

  handleClearNotification = (event) => {
    event.preventDefault();
    this
      .props
      .doUpdateUserNotification(this.props.index, true);
  }

  componentDidMount() {
    // only scroll the top one into view
    if (this.props.index === 0) {
      ewoloUtil.scrollElementIntoView(this.refs[this.refUserNotification]);
    }
  }

  render() {

    if (this.props.userNotification.isRead) {
      return null;
    }

    return (
      <div className="columns">
        <div className="column col-xs-12">
          <div
            ref={this.refUserNotification}
            className={"toast user-notification " + getNotificationClassName(this.props.userNotification.type)}>
            <button
              className="btn btn-clear float-right"
              onClick={this.handleClearNotification}></button>
            <div>
              {this.props.userNotification.text}
            </div>
            <div className="notification-timestamp">
              {moment(this.props.userNotification.at).fromNow()}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

UserNotification.propTypes = {
  index: PropTypes.number.isRequired,
  doUpdateUserNotification: PropTypes.func.isRequired,
  userNotification: PropTypes.object.isRequired
};

export default UserNotification;
