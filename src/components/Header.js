import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';

import './header.css';

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
      <div>
        <div className="container grid-1280">
          <header className="navbar">
            <section className="navbar-section">
              <a
                id="sidebar-show"
                href="#"
                className="btn btn-lg btn-link btn-action show-sm">
                <i
                  className="icon icon-menu"
                  onClick={this
                  .handleSidebarShowClick
                  .bind(this)}></i>
              </a>
              <Link to="/" className="navbar-brand mr-10">Easy Workout Log</Link>
            </section>
            <section className="navbar-section navbar-content">
              <NavLink exact to="/" className="btn btn-link">Home</NavLink>
              <NavLink exact to="/log-workout" className="btn btn-link">Log a workout</NavLink>
            </section>
            <section className="navbar-section navbar-content"></section>
          </header>
        </div>
        <div id="sidebar" className="container grid-960">
          <div className="columns">
            <div
              className={"docs-sidebar column col-3 col-sm-12 " + this.state.docsSidebarClass}>
              <ul className="docs-nav nav">
                <li className="brand">
                  Easy workout log
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
                <li className="nav-item">
                  <NavLink
                    exact
                    to="/log-workout"
                    onClick={this
                    .handleSidebarCloseClick
                    .bind(this)}>Log a workout</NavLink>
                </li>
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
              href="#"
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

export default Header;
