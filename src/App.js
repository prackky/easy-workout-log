import React, {Component} from 'react';
import {/*BrowserRouter,*/ Route} from 'react-router-dom';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware, createStore, combineReducers} from 'redux';

import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

import Header from './components/Header';
import Welcome from './components/Welcome';
import UserNotificationBar from './components/notification/UserNotificationBar';
import LogWorkout from './components/log-workout/LogWorkout';


import appReducer from './core/reducers/appReducer';

import './App.css';

const history = createHistory();

const store = createStore(appReducer, applyMiddleware(routerMiddleware(history), thunk, logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Header/>
            <UserNotificationBar/>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/log-workout" component={LogWorkout}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
