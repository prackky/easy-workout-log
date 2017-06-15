import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import {withRouter} from 'react-router'
import {connect} from 'react-redux';

import './header.css';

const mapStateToProps = (state) => {
  return {authToken: state.user.data.authToken};
};

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      docsSidebarClass: '',
      sidebarCloseClass: ''
    };
  }

  handleSidebarShowClick() {
    this.setState({docsSidebarClass: 'show', sidebarCloseClass: 'show'});
  }

  handleSidebarCloseClick() {
    this.setState({docsSidebarClass: '', sidebarCloseClass: ''});
  }

  render() {

    return (
      <div className="bg-gray">
        <div className="container grid-1280 ">
          <header className="navbar">
            <section className="navbar-section">
              <button
                id="sidebar-show"
                className="btn btn-link btn-action btn-lg"
                onClick={this
                .handleSidebarShowClick
                .bind(this)}>
                <i className="icon icon-menu"></i>
              </button>

              <Link to="/" className="navbar-brand mr-10">Ewolo</Link>
            </section>
            <section className="navbar-section navbar-content">
              <NavLink exact to="/" className="btn btn-link">Home</NavLink>
              {(() => {
                if (this.props.authToken) {
                  return (
                    <NavLink exact to="/dashboard" className="btn btn-link">Dashboard</NavLink>
                  );
                }
              })()}
              <NavLink exact to="/log-workout" className="btn btn-link">Log workout</NavLink>
            </section>
            <section className="navbar-section navbar-content">
              {(() => {
                if (this.props.authToken) {
                  return (
                    <NavLink exact to="/logout" className="btn btn-link">Logout</NavLink>
                  );
                }
              })()}
              {(() => {
                if (!this.props.authToken) {
                  return (
                    <NavLink exact to="/login" className="btn btn-link">Login</NavLink>
                  );
                }
              })()}
              {(() => {
                if (!this.props.authToken) {
                  return (
                    <NavLink exact to="/signup" className="btn btn-link">Signup</NavLink>
                  );
                }
              })()}
            </section>
          </header>
        </div>
        <div id="sidebar" className="container grid-960">
          <div className="columns">
            <div
              className={"docs-sidebar column col-3 col-sm-12 " + this.state.docsSidebarClass}>

              <div className="text-right">
                <button
                  id="btn-sidebar-close"
                  className="btn btn-link btn-action btn-lg"
                  onClick={this
                  .handleSidebarCloseClick
                  .bind(this)}>
                  <i className="icon icon-cross"></i>
                </button>
              </div>

              <ul className="docs-nav nav">
                <li className="brand">
                  Ewolo
                </li>
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/"
                    className="navbar-brand mr-10"
                    onClick={this
                    .handleSidebarCloseClick
                    .bind(this)}>Home</NavLink>
                </li>
                {(() => {
                  if (this.props.authToken) {
                    return (
                      <li className="nav-item">
                        <NavLink
                          exact
                          to="/dashboard"
                          onClick={this
                          .handleSidebarCloseClick
                          .bind(this)}>Dashboard</NavLink>
                      </li>
                    );
                  }
                })()}
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/log-workout"
                    onClick={this
                    .handleSidebarCloseClick
                    .bind(this)}>Log workout</NavLink>
                </li>
                {(() => {
                  if (this.props.authToken) {
                    return (
                      <li className="nav-item">
                        <NavLink
                          exact
                          to="/logout"
                          onClick={this
                          .handleSidebarCloseClick
                          .bind(this)}>Logout</NavLink>
                      </li>
                    );
                  }
                })()}
                {(() => {
                  if (!this.props.authToken) {
                    return (
                      <li className="nav-item">
                        <NavLink
                          exact
                          to="/login"
                          onClick={this
                          .handleSidebarCloseClick
                          .bind(this)}>Login</NavLink>
                      </li>
                    );
                  }
                })()}
                {(() => {
                  if (!this.props.authToken) {
                    return (
                      <li className="nav-item">
                        <NavLink
                          exact
                          to="/signup"
                          onClick={this
                          .handleSidebarCloseClick
                          .bind(this)}>Signup</NavLink>
                      </li>
                    );
                  }
                })()}

                {/*
                <li className="nav-item">
                  <a href="#"><strong>Insights</strong></a>
                  <ul className="nav">
                    <li className="nav-item"><a href="/sd-insights/best-ubuntu-laptop"><span className="date">2016-07-20</span> | The best laptop for an Ubuntu system</a></li>
                    <li className="nav-item"><a href="/sd-insights/investment-ideas"><span className="date">2015-04-30</span> | Long-term investment ideas</a></li>
                    <li className="nav-item"><a href="/sd-insights/breakup"><span className="date">2014-10-11</span> | The breakup day</a></li>
                  </ul>
                </li>
                <li className="nav-item"><a href="/blog">Blog</a></li>
                <li className="nav-item">
                  <a href="#"><strong>Playground</strong></a>
                  <ul className="nav">
                    <li className="nav-item"><a href="/playground/the-artist"><span className="date">2017-04-20</span> | The artist</a></li>
                  </ul>
                </li>
                */}
              </ul>
            </div>
            <a
              id="sidebar-close"
              className={"docs-nav-clear " + this.state.sidebarCloseClass}
              onClick={this
              .handleSidebarCloseClick
              .bind(this)}></a>

          </div>
        </div>

      </div>
    );
  }

};

export default withRouter(connect(mapStateToProps)(Header));
