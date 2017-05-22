import React, {Component} from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';

import Header from './components/Header';
import Welcome from './components/Welcome';
import LogWorkout from './components/LogWorkout';

import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Route exact path="/" component={Welcome}/>
          <Route exact path="/log-workout" component={LogWorkout}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
