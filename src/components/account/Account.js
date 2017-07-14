import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';
import EwoloFormHint from '../generic/EwoloFormHint';

import accountActions from '../../modules/account/accountActions';

const mapStateToProps = (state) => {
  return {account: state.account};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doAccountSetPasswordData: (oldPassword, password) => {
      dispatch(accountActions.accountSetPasswordData(oldPassword, password));
    },
    doAccountPasswordUpdateThunk: () => {
      dispatch(accountActions.accountPasswordUpdateThunk());
    }
  };
};

class Account extends Component {

  handleBtnUpdatePasswordClick = (event) => {
    event.preventDefault();
    this
      .props
      .doAccountPasswordUpdateThunk();
  };

  handleOldPasswordChange = (event) => {
    this
      .props
      .doAccountSetPasswordData(event.target.value, this.props.account.password);
  };

  handlePasswordChange = (event) => {
    this
      .props
      .doAccountSetPasswordData(this.props.account.oldPassword, event.target.value);
  };

  render() {

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-480 section-content">
          <div className="columns">
            <div className="column col-12">
              <h4>Account</h4>
              <p>
                Use the following sections to modify your account.
              </p>
            </div>
            <div className="column col-12">
              <div>
                <h5>Update password</h5>
                <form className="form-horizontal">

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="password"
                        placeholder="Current password"
                        value={this.props.account.oldPassword}
                        onChange={this.handleOldPasswordChange}/>
                    </div>
                  </div>

                  <EwoloFormHint formHint={this.props.account.oldPasswordFormHint} />

                  <div className="form-group">
                    <div className="col-12">
                      <input
                        className="form-input"
                        type="password"
                        placeholder="New password"
                        value={this.props.account.password}
                        onChange={this.handlePasswordChange}/>
                    </div>

                  </div>

                  <EwoloFormHint formHint={this.props.account.passwordFormHint} />

                  <div className="form-group">
                    <div className="col-12 text-center">
                      <button
                        className={"btn btn-primary btn-lg " + ((this.props.account.oldPassordFormHint || this.props.account.passwordFormHint || !this.props.account.oldPassword || !this.props.account.password)
                        ? 'disabled'
                        : '')}
                        onClick={this.handleBtnUpdatePasswordClick}>Update password</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Account);
