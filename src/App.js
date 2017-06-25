import React, {Component} from 'react';
import {/*BrowserRouter,*/
  Route
} from 'react-router-dom';

import {Provider} from 'react-redux';
// import thunk from 'redux-thunk';
import reduxLogger from 'redux-logger';
import {
  applyMiddleware, createStore,
  /*, combineReducers*/
  compose
} from 'redux';

import {
  ConnectedRouter,
  /*routerReducer,*/
  routerMiddleware
} from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import packageJson from './package.json.link'; // Needed to create a symlink because of https://github.com/facebookincubator/create-react-app/issues/2466

import ewoloUtil from './common/ewoloUtil';
import ewoloConstants from './common/ewoloConstants';

import thunk from './redux-middleware/thunk';

import Header from './components/page/Header';
import Footer from './components/page/Footer';
import Privacy from './components/page/Privacy';
import Terms from './components/page/Terms';
import Welcome from './components/welcome/Welcome';
import LogWorkout from './components/log-workout/LogWorkout';
import Loader from './components/page/Loader';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Dashboard from './components/dashboard/Dashboard';

import appReducer from './modules/appReducer';

import userDataActions from './modules/user-data/userDataActions';

import './App.css';

const history = createHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeMiddlware = [routerMiddleware(history), thunk];
// only enable state logging in debug
if (process.env.NODE_ENV !== 'production') {
  storeMiddlware.push(reduxLogger);
}
const store = createStore(appReducer, composeEnhancers(applyMiddleware(...storeMiddlware)));

// initialize authToken should really be the single source of truth
const authToken = ewoloUtil.getObject(ewoloConstants.storage.authTokenKey);
const id = ewoloUtil.getObject(ewoloConstants.storage.userIdKey);
if (authToken && id) {
  store.dispatch(userDataActions.userAuthSuccess(authToken, id));
}

class App extends Component {

  componentDidMount() {
    store.dispatch(userDataActions.fetchUserDataThunk());
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Loader/>
            <Header/>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/privacy" component={Privacy}/>
            <Route exact path="/terms" component={Terms}/>
            <Route exact path="/log-workout" component={LogWorkout}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Footer clientVersion={packageJson.version} apiVersion={ewoloConstants.api.version}/>
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
