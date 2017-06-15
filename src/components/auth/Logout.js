import React, {Component} from 'react';
// import {Redirect} from 'react-router'; import {Link} from 'react-router-dom';
// import {connect} from 'react-redux'; import UserNotificationBar from
// '../notification/UserNotificationBar'; import loginActions from
// '../../modules/login/loginActions';

import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';

/*
const mapStateToProps = (state) => {
  return {login: state.login, authToken: state.user.data.authToken};
};

const mapDispatchToProps = {
  doLoginSetData: loginActions.loginSetData,
  doLogin: loginActions.login
};
*/

class Logout extends Component {

  /*
  handleBtnLoginClick = (event) => {
    event.preventDefault();
    this
      .props
      .doLogin();
  };

  handleEmailChange = (event) => {
    console.log(event.target.value);
    this
      .props
      .doLoginSetData(event.target.value, this.props.login.password, this.props.login.text);
  };

  handlePasswordChange = (event) => {
    this
      .props
      .doLoginSetData(this.props.login.email, event.target.value, this.props.login.text);
  };
  */

  componentDidMount() {
    ewoloUtil.removeObject(ewoloConstants.storage.authTokenKey);
    setTimeout(() => {
      window.location.href = '/';
    }, 0);
  }

  render() {
    // return (<Redirect to="/"/>);
    return null;
  }
};

// export default connect(mapStateToProps, mapDispatchToProps)(Logout);
export default Logout;
