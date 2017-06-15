import React, {Component} from 'react';
// import {Redirect} from 'react-router';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';

import signupActions from '../../modules/signup/signupActions';

const mapStateToProps = (state) => {
  return {signup: state.signup};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSignupSetData: (name, email, password) => {
      dispatch(signupActions.signupSetData(name, email, password));
    },
    doSignup: () => {
      dispatch(signupActions.signup());
    }
  };
};

class Signup extends Component {

  handleBtnSignupClick = (event) => {
    event.preventDefault();
    this
      .props
      .doSignup();
  };

  handleNameChange = (event) => {
    this
      .props
      .doSignupSetData(event.target.value, this.props.signup.email, this.props.signup.password);
  };

  handleEmailChange = (event) => {
    this
      .props
      .doSignupSetData(this.props.signup.name, event.target.value, this.props.signup.password);
  };

  handlePasswordChange = (event) => {
    this
      .props
      .doSignupSetData(this.props.signup.name, this.props.signup.email, event.target.value);
  };

  render() {
    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-480 section-content">
          <div className="columns">
            <div className="column col-12">
              <div className="text-center">
                <h4>Create an account</h4>
                <form className="form-horizontal">

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Full Name"
                        value={this.props.signup.name}
                        onChange={this
                        .handleNameChange
                        .bind(this)}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="email"
                        placeholder="Email"
                        value={this.props.signup.email}
                        onChange={this
                        .handleEmailChange
                        .bind(this)}/>
                    </div>

                  </div>

                  <div
                    className={"form-group form-input-hint fade-in " + (this.props.signup.emailFormHint
                    ? ''
                    : 'hide')}>
                    <div className="col-12 text-left">
                      {this.props.signup.emailFormHint}
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="password"
                        placeholder="Password"
                        value={this.props.signup.password}
                        onChange={this
                        .handlePasswordChange
                        .bind(this)}/>
                    </div>

                  </div>

                  <div
                    className={"form-group form-input-hint fade-in " + (this.props.signup.passwordFormHint
                    ? ''
                    : 'hide')}>
                    <div className="col-12 text-left">
                      {this.props.signup.passwordFormHint}
                    </div>
                  </div>

                  {/*
                  <div className="form-group">
                    <div className="col-12 text-left">
                      <label className="form-switch">
                        <input type="checkbox"/>
                        <i className="form-icon"></i>
                        Send me emails with news and tips
                      </label>
                    </div>
                  </div>
                  */}

                  <div className="form-group">
                    <div className="col-12 text-center">
                      <button
                        className={"btn btn-primary btn-lg " + ((this.props.signup.emailFormHint || this.props.signup.passwordFormHint || !this.props.signup.email || !this.props.signup)
                        ? 'disabled'
                        : '')}
                        onClick={this
                        .handleBtnSignupClick
                        .bind(this)}>Signup</button>
                    </div>
                  </div>

                  <div className="form-group margin-top-3rem">
                    <div className="col-12 text-center">
                      <Link to="/login">Already have an account?</Link>
                    </div>
                  </div>

                  <div className="form-group margin-top-3rem">
                    <div className="col-12 text-center">
                      By signing up you agree to our Terms of Service
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
