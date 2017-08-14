import React, {Component} from 'react';
import {connect} from 'react-redux';

import ewoloUtil from '../../common/ewoloUtil';
import globalActions from '../../modules/global/globalActions';

const mapStateToProps = (state) => {
  return {appNotification: state.global.appNotification, authToken: state.user.data.authToken};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doAppNotificationClear: () => {
      dispatch(globalActions.appNotificationSet('', ''));
    }
  };
};

class AppNotification extends Component {

  handleClearNotification = (event) => {
    event.preventDefault();
    ewoloUtil.storeObject(this.props.appNotification.id, {seen: true});
    this
      .props
      .doAppNotificationClear();
  }

  render() {
    if (!this.props.appNotification.id) {
      return null;
    }

    if (this.props.appNotification.show && this.props.appNotification.show === 'logged-in' && !this.props.authToken) {
      return null;
    }
    
    return (
      <div className="toast global-notification">
        <button
          className="btn btn-clear float-right"
          onClick={this.handleClearNotification}></button>
        <div>{this.props.appNotification.text}</div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNotification);
