import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
  return {signup: state.signup};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

class Signup extends Component {

  constructor(props) {
    super(props);
  }

  handleBtnSignupClick = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="container grid-480 section-content">
        <div className="columns">
          <div className="column col-12">
            <div className="text-center">
              <h4>Create an account</h4>
              <button
                className="btn btn-primary"
                onClick={this
                .handleBtnSignupClick
                .bind(this)}>Signup</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
