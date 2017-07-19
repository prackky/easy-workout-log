import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';
import EwoloFormHint from '../generic/EwoloFormHint';

import accountActions from '../../modules/account/accountActions';
import userDataActions from '../../modules/user-data/userDataActions';

const mapStateToProps = (state) => {
  return {account: state.account, userData: state.user.data};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doAccountSetPasswordData: (oldPassword, password) => {
      dispatch(accountActions.accountSetPasswordData(oldPassword, password));
    },
    doAccountPasswordUpdateThunk: () => {
      dispatch(accountActions.accountPasswordUpdateThunk());
    },
    doSetUserData: ({exerciseNames, name, email, units}) => {
      dispatch(userDataActions.userDataSet(exerciseNames, name, email, units));
    },
    doUserDataUpdateThunk: () => {
      dispatch(userDataActions.userDataUpdateThunk());
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

  handleNameChange = (event) => {
    this
      .props
      .doSetUserData({exerciseNames: this.props.userData.exerciseNames, name: event.target.value, email: this.props.userData.email, units: this.props.userData.units});
  }

  handleUnitSelectionChange = (event) => {
    this
      .props
      .doSetUserData({exerciseNames: this.props.userData.exerciseNames, name: this.props.userData.name, email: this.props.userData.email, units: event.target.value});
  }

  handleBtnUpdateAccountClick = (event) => {
    event.preventDefault();
    this
      .props
      .doUserDataUpdateThunk();
  }

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
                <h5>Settings</h5>
                <form className="form-horizontal">
                  
                  <div className="form-group">
                    <div className="col-4">
                      <label className="form-label">Full name</label>
                    </div>
                    <div className="col-8">
                      <input
                        className="form-input"
                        type="text"
                        placeholder="Full name"
                        value={this.props.userData.name}
                        onChange={this.handleNameChange}/>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-4">
                      <label className="form-label">Default weight units</label>
                    </div>
                    <div className="col-8">
                      <select
                        className="form-select"
                        value={this.props.userData.units}
                        onChange={this.handleUnitSelectionChange}>
                        <option value="1">Pounds (lbs)</option>
                        <option value="2">Kilograms (kgs)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-12 text-center">
                      <button
                        className="btn btn-primary btn-lg"
                        onClick={this.handleBtnUpdateAccountClick}>Update settings</button>
                    </div>
                  </div>

                </form>

              </div>
            </div>
            <div className="column col-12">
              <div>
                <h5>Password</h5>
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

                  <EwoloFormHint formHint={this.props.account.oldPasswordFormHint}/>

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

                  <EwoloFormHint formHint={this.props.account.passwordFormHint}/>

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
