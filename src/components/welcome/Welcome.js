import React, {Component} from 'react';
import {Redirect} from 'react-router';
import {connect} from 'react-redux';

import './Welcome.css';

import logWorkoutActions from '../../modules/log-workout/logWorkoutActions';
import iPhone6 from './iphone-6.png';
import iPhone6EwoloProgress from './ewolo-progress-iphone-6.png';
// import iPhone6black from './iphone-6-black.png';

const features = [
  'Intuitive UI makes data entry pleasurable',
  'Log workouts in the past, present and future',
  'Log multiple workouts in a single day',
  'Support for super-sets via an optional rest field',
  'Track rep intensity via an optional tempo field',
  'Optionally track rest times between individual sets',
  'and more ...'
];

const highlights = [
  {
    title: 'Log workouts within minutes',
    text: `Add an exercise, optionally choose from a list of over 100 exercises 
    or type in your own exercise name. Add reps and weight for each set, 
    optionally add multiple sets for the same exercise. Save.`,
    icon: 'fa-clock-o'
  }, {
    title: 'Available everywhere',
    text: `Log workouts anywhere. No need to install another app on the phone. 
    The UI has been designed from the ground up to be a pleasure to use on a 
    mobile device. Log workouts and track progress on Windows, iOS, Linux, 
    iPhone, android.`,
    icon: 'fa-globe'
  }, {
    title: 'Track your progress',
    text: `Get insights in your past workout results and find out how you’re 
    progressing through useful stats and graphs.`,
    icon: 'fa-bar-chart'
  }
];

const mapStateToProps = (state) => {
  return {user: state.user};
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogWorkout: () => {
      dispatch(logWorkoutActions.logWorkout());
    }
  };
};

class Welcome extends Component {

  state = {
    redirect: ''
  };

  handleBtnLogWorkoutClick = () => {
    this.setState({redirect: '/log-workout'}); // using react-router with a button is not straightforward at all
  };

  render() {
    if (this.state.redirect) {
      return (<Redirect push to={this.state.redirect}/>);
    }

    return (
      <div className="home">
        <section className="welcome">
          <div className="hero">
            <div className="content">
              <div className="title">
                Ewolo
              </div>
              <div className="subtitle">
                Log workouts anywhere, track progress and achieve your goals.
              </div>

              <div className="action">
                Get started for free
              </div>
              <button
                className="btn btn-welcome-log-workout"
                onClick={this.handleBtnLogWorkoutClick}>Log a workout</button>

            </div>
          </div>
        </section>
        <section className="highlights">
          <div className="container grid-1280">
            <div className="columns">
              {highlights.map((highlight, index) => {
                return this.renderHighlightItem(highlight, index);
              })}
            </div>
          </div>
        </section>
        <section className="features">
          <div className="container grid-1280">
            <div className="columns">
              <div className="column col-1 col-md-12"></div>
              <div className="column col-4 col-md-12">
                <div className="feature-list">
                  <h3 className="text-center">Features</h3>
                  <ul className="fa-ul">
                    {features.map((feature, index) => {
                      return this.renderFeatureListItem(feature, index);
                    })}
                  </ul>
                </div>
              </div>
              <div className="column col-3 col-md-12">
                <img src={iPhone6} className="img-responsive centered" alt="iphone6 application ui example"/>
                {/*<img src={iPhone6black} className="img-responsive"/>*/}
              </div>
              <div className="column col-3 col-md-12">
                <img src={iPhone6EwoloProgress} className="img-responsive centered" alt="iphone6 application ui progress example"/>
              </div>
              <div className="column col-1 col-md-12"></div>
            </div>
          </div>
        </section>
        <section className="last-call">
          <div className="container grid-1280">
            <div className="content text-center">
              <h3>Simple setup</h3>
              <p>
                Logging a workout shouldn't take more than a few minutes. Try Ewolo for free.
              </p>
              <button
                className="btn btn-welcome-log-workout"
                onClick={this.handleBtnLogWorkoutClick}>Log a workout</button>
              <p>
                Account only required if you wish to save your workouts.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  renderHighlightItem(highlight, index) {
    return (
      <div className="column col-sm-12 col-4 highlight" key={index}>
        <i className={"fa fa-4x " + highlight.icon}></i>
        <h4>{highlight.title}</h4>
        <p>{highlight.text}</p>
      </div>
    )
  }

  /*
  renderFeatureListItem(text, index) {
    return (
      <div key={index} className="feature-list-item columns">
        <div className="column col-1">
          <i className="icon icon-arrow-right"></i>
        </div>
        <div className="column col-11">{text}</div>
      </div>
    );
  }
  */
  renderFeatureListItem(text, index) {
    return (
      <li key={index} className="feature-list-item">
        <i className="fa-li fa fa-check feature-list-item"></i>{text}</li>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
