import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import './welcome.css';

import userActions from '../core/actions/userActions';

const mapStateToProps = (state) => {
  return {user: state.user};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: ''
    };
  }

  handleBtnLogWorkoutClick = () => {
    this.setState({redirect: '/log-workout'});
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect push to={this.state.redirect}/>);
    }

    return (
      <div className="container grid-1280">
        <div className="columns">
          <div className="column col-12">
            <div className="text-center">
              <h2>Easy workout log</h2>
              <h4>Progress tracking made simple</h4>
              {/* background image this with a logo */}
              <button
                className="btn btn-primary btn-welcome-log-workout"
                onClick={this
                .handleBtnLogWorkoutClick
                .bind(this)}>Log a workout</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
