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

import ewoloUtil from './common/ewoloUtil';
import ewoloConstants from './common/ewoloConstants';

import Header from './components/Header';
import Welcome from './components/Welcome';
import LogWorkout from './components/log-workout/LogWorkout';
import Loader from './components/Loader';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Dashboard from './components/dashboard/Dashboard';

import appReducer from './modules/appReducer';

import userDataActions from './modules/user-data/userDataActions';

import './App.css';

const history = createHistory();

const store = createStore(appReducer, applyMiddleware(routerMiddleware(history), thunk, logger));

// initialize
// authToken should really be the single source of truth
const authToken = ewoloUtil.getObject(ewoloConstants.storage.authTokenKey);
const id = ewoloUtil.getObject(ewoloConstants.storage.userIdKey);
if (authToken && id) {
  store.dispatch(userDataActions.userAuthSuccess(authToken, id));
}

class App extends Component {

  componentDidMount() {
    store.dispatch(userDataActions.fetchUserData());
  }

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
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

history.listen((location) => {
  console.log('location', location); // TODO: Think about clearing the message bar when transitioning to certain states
  // TODO: save to localstorage on transition
});

export default App;
