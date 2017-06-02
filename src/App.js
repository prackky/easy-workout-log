import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';

import Header from './components/Header';
import Welcome from './components/Welcome';
import UserNotificationBar from './components/notification/UserNotificationBar';
import LogWorkout from './components/log-workout/LogWorkout';

import appReducer from './core/reducers/appReducer';

import './App.css';

const store = createStore(appReducer, applyMiddleware(thunk, logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Header/>
            <UserNotificationBar/>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/log-workout" component={LogWorkout}/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
