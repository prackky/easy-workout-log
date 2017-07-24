import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserNotificationBar from '../notification/UserNotificationBar';
import EwoloFormHint from '../generic/EwoloFormHint';

import ewoloUtil from '../../common/ewoloUtil';
import accountActions from '../../modules/account/accountActions';

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
    doAccountSetData: ({name, units, sex}) => {
      dispatch(accountActions.accountSetData({name, units, sex}));
    },
    doAccountDataUpdateThunk: () => {
      dispatch(accountActions.accountDataUpdateThunk());
    }
  };
};

class Account extends Component {

  componentDidMount() {
    this
      .props
      .doAccountSetData({name: this.props.userData.name, units: this.props.userData.units, sex: this.props.userData.sex});
  }

  componentWillReceiveProps(nextProps) {
    // in the case that the account page is loaded directly we need this check to set the default values ...
    if (this.props.userData.name !== nextProps.userData.name || this.props.userData.units !== nextProps.userData.units || this.props.userData.sex !== nextProps.userData.sex) {
      
      this
        .props
        .doAccountSetData({name: nextProps.userData.name, units: nextProps.userData.units, sex: nextProps.userData.sex});
    }
  }

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
      .doAccountSetData({name: event.target.value, units: this.props.account.units, sex: this.props.account.sex});
  }

  handleUnitSelectionChange = (event) => {
    this
      .props
      .doAccountSetData({name: this.props.account.name, units: event.target.value, sex: this.props.account.sex});
  }

  handleSexChange = (event) => {
    const sex = ewoloUtil.textToSex(event.target.name);
    
    this
      .props
      .doAccountSetData({name: this.props.account.name, units: this.props.account.units, sex: sex});
  }

  handleBtnUpdateAccountClick = (event) => {
    event.preventDefault();
    this
      .props
      .doAccountDataUpdateThunk();
  }

  render() {

    return (
      <div>
        <UserNotificationBar/>
        <div className="container grid-480 section-content">
          <div className="columns">
            <div className="column col-12">
              <h3>Account</h3>
              <p className="no-text">
                Use the following sections to modify your account.
              </p>
            </div>
            <div className="column col-12">
              <div>
                <h4>Details</h4>
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
                        value={this.props.account.name}
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
                        value={this.props.account.units}
                        onChange={this.handleUnitSelectionChange}>
                        <option value="1">Pounds (lbs)</option>
                        <option value="2">Kilograms (kgs)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="col-4">
                      <label className="form-label">Sex</label>
                    </div>
                    <div className="col-8">
                      <label className="form-radio">
                        <input
                          type="radio"
                          name="male"
                          checked={this.props.account.sex === 2}
                          onChange={this.handleSexChange}/>
                        <i className="form-icon"></i>
                        Male
                      </label>
                      <label className="form-radio">
                        <input
                          type="radio"
                          name="female"
                          checked={this.props.account.sex === 3}
                          onChange={this.handleSexChange}/>
                        <i className="form-icon"></i>
                        Female
                      </label>
                      <label className="form-radio">
                        <input
                          type="radio"
                          name="other"
                          checked={this.props.account.sex === 1}
                          onChange={this.handleSexChange}/>
                        <i className="form-icon"></i>
                        Other
                      </label>
                    </div>
                  </div>

                  <div className="form-group margin-top-3rem">
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
                <h4>Password</h4>
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

                  <div className="form-group margin-top-3rem">
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
