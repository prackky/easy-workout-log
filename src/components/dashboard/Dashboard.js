import React, {Component} from 'react';
// import PropTypes from 'prop-types'
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';
import userWorkoutsActions from '../../modules/user-workouts/userWorkoutsActions';

const mapStateToProps = (state/*, ownProps*/) => {
  return {
    // ...ownProps,
    authToken: state.user.data.authToken,
    dashboard: state.user.dashboard
  };
};

const mapDispatchToProps = {
  doFetchUserWorkouts: userWorkoutsActions.fetchUserWorkouts
};

class Dashboard extends Component {
  /*
  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  }
  */

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.authToken) {
      this
        .props
        .doFetchUserWorkouts();
    }
  }

  render() {
    if (!this.props.authToken) {
      return (<Redirect to="/"/>);
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
