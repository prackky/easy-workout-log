import React, {Component} from 'react';
import {/*BrowserRouter,*/
  Route
} from 'react-router-dom';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {
  applyMiddleware, createStore/*, combineReducers*/
} from 'redux';

import {
  ConnectedRouter,
  /*routerReducer,*/
  routerMiddleware
} from 'react-router-redux'
import createHistory from 'history/createBrowserHistory';

import Header from './components/Header';
import Welcome from './components/Welcome';
import LogWorkout from './components/log-workout/LogWorkout';
import Loader from './components/Loader';
import Signup from './components/auth/Signup';
import Dashboard from './components/dashboard/Dashboard';

import appReducer from './reducers/appReducer';

import './App.css';

const history = createHistory();

const store = createStore(appReducer, applyMiddleware(routerMiddleware(history), thunk, logger));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Loader/>
            <Header/>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/log-workout" component={LogWorkout}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

history.listen((location) => {
  console.log(location); // TODO: Think about clearing the message bar when transitioning to certain states
  // TODO: save to localstorage on transition
});

export default App;
