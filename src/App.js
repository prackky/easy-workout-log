import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import Header from './components/Header';
import Welcome from './components/Welcome';
import UserNotification from './components/notification/UserNotification';
import LogWorkout from './components/log-workout/LogWorkout';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <UserNotification/>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/log-workout" component={LogWorkout}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
