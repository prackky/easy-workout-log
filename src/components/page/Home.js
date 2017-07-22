import React, {Component} from 'react';
import {connect} from 'react-redux';

import Dashboard from '../dashboard/Dashboard';
import Welcome from '../welcome/Welcome';

const mapStateToProps = (state) => {
  return {authToken: state.user.data.authToken};
};

class Home extends Component {

  render() {
    if (this.props.authToken) {
      return <Dashboard/>
    }

    return <Welcome/>
  }
};

export default connect(mapStateToProps)(Home);
