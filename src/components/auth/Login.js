import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';
import EwoloFormHint from '../generic/EwoloFormHint';

import loginActions from '../../modules/login/loginActions';

const mapStateToProps = (state) => {
  return {login: state.login};
};

const mapDispatchToProps = {
  doLoginSetData: loginActions.loginSetData,
  doLoginThunk: loginActions.loginThunk
};

class Login extends Component {

  handleBtnLoginClick = (event) => {
    event.preventDefault();
    this
      .props
      .doLoginThunk();
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

  render() {

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-480 section-content">
          <div className="columns">
            <div className="column col-12">
              <div className="text-center">
                <h4>Login</h4>
                <form className="form-horizontal">

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={this.props.login.email}
                        onChange={this.handleEmailChange}/>
                    </div>

                  </div>

                  <EwoloFormHint formHint={this.props.login.emailFormHint} />

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        value={this.props.login.password}
                        onChange={this.handlePasswordChange}/>
                    </div>

                  </div>

                  <EwoloFormHint formHint={this.props.login.passwordFormHint} />

                  <div className="form-group">
                    <div className="col-12 text-center">
                      <button
                        className={"btn btn-primary btn-lg " + ((this.props.login.emailFormHint || this.props.login.passwordFormHint || !this.props.login.email || !this.props.login)
                        ? 'disabled'
                        : '')}
                        onClick={this.handleBtnLoginClick}>Login</button>
                    </div>
                  </div>

                  <div className="form-group margin-top-3rem">
                    <div className="col-12 text-center">
                      <Link to="/signup">Don't have an account?</Link>
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
