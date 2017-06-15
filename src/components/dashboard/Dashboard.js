import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';

const mapStateToProps = (state) => {
  return {
    authToken: state.user.data.authToken,
    dashboard: state.user.dashboard
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class Dashboard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.authToken) {
      return (<Redirect to="/" />);
    }
    
    return (
      <div>
        <UserNotificationBar/>
      <div className="container grid-1280 section-content">
        <div className="columns">
          <div className="column col-12">
            Dashboard
          </div>
        </div>
      </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
