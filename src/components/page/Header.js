import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import {withRouter} from 'react-router'
import {connect} from 'react-redux';

import './Header.css';
import ewoloLogo from './ewolo-logo.png';

import LinkWithChildren from '../generic/LinkWithChildren';

const mapStateToProps = (state) => {
  return {authToken: state.user.data.authToken};
};

class Header extends Component {

  state = {
    docsSidebarClass: '',
    sidebarCloseClass: ''
  };

  handleSidebarShowClick = () => {
    this.setState({docsSidebarClass: 'show', sidebarCloseClass: 'show'});
  }

  handleSidebarCloseClick = () => {
    this.setState({docsSidebarClass: '', sidebarCloseClass: ''});
  }

  render() {

    const userAccountMenu = (
      <div className="dropdown dropdown-right">
        <a href="#" className="btn btn-link dropdown-toggle" tabIndex="0">
          <i className="fa fa-user" aria-hidden="true"></i>
          <i className="icon icon-caret"></i>
        </a>
        <ul className="menu">
          <li className="menu-item">
            <LinkWithChildren exact to="/logout">
              <i className="fa fa-sign-out" aria-hidden="true"></i>
              Logout
            </LinkWithChildren>
          </li>
        </ul>
      </div>
    );

    return (
      <div className="bg-gray">
        <div className="container grid-1280 ">
          <header className="navbar">
            <section className="navbar-section">
              <button
                id="sidebar-show"
                className="btn btn-link btn-action btn-lg"
                onClick={this.handleSidebarShowClick}>
                <i className="icon icon-menu"></i>
              </button>

              <Link to="/" className="navbar-brand mr-10"><img src={ewoloLogo} className="img-responsive" alt="ewolo logo"/></Link>
            </section>
            <section className="navbar-section navbar-content">
              <NavLink exact to="/" className="btn btn-link">Home</NavLink>
              {this.props.authToken && (
                <NavLink exact to="/dashboard" className="btn btn-link">Dashboard</NavLink>
              )}
              <NavLink exact to="/log-workout" className="btn btn-link">Log workout</NavLink>
            </section>
            <section className="navbar-section navbar-content">
              {this.props.authToken && userAccountMenu}
              {!this.props.authToken && (
                <NavLink exact to="/login" className="btn btn-link">Login</NavLink>
              )}
              {!this.props.authToken && (
                <NavLink exact to="/signup" className="btn btn-link">Signup</NavLink>
              )}
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
                  onClick={this.handleSidebarCloseClick}>
                  <i className="icon icon-cross"></i>
                </button>
              </div>

              <ul className="docs-nav nav">
                <li className="brand">
                  <img src={ewoloLogo} className="img-responsive" alt="ewolo logo"/>
                </li>
                <li className="nav-item">
                  <NavLink exact to="/" onClick={this.handleSidebarCloseClick}>Home</NavLink>
                </li>
                {this.props.authToken && (
                  <li className="nav-item">
                    <NavLink exact to="/dashboard" onClick={this.handleSidebarCloseClick}>Dashboard</NavLink>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink exact to="/log-workout" onClick={this.handleSidebarCloseClick}>Log workout</NavLink>
                </li>
                <li className="divider"></li>
                {this.props.authToken && (
                  <li className="nav-item">
                    <NavLink exact to="/logout" onClick={this.handleSidebarCloseClick}>Logout</NavLink>
                  </li>
                )}
                {!this.props.authToken && (
                  <li className="nav-item">
                    <NavLink exact to="/login" onClick={this.handleSidebarCloseClick}>Login</NavLink>
                  </li>
                )}
                {!this.props.authToken && (
                  <li className="nav-item">
                    <NavLink exact to="/signup" onClick={this.handleSidebarCloseClick}>Signup</NavLink>
                  </li>
                )}

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
              onClick={this.handleSidebarCloseClick}></a>

          </div>
        </div>

      </div>
    );
  }

};

export default withRouter(connect(mapStateToProps)(Header));
