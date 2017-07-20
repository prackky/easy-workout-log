import React, {Component} from 'react';
import {/*BrowserRouter,*/
  Route
} from 'react-router-dom';

import {Provider} from 'react-redux';

import {
  ConnectedRouter,
  /*routerReducer,*/
  routerMiddleware
} from './react-router-redux/index';
import createHistory from 'history/createBrowserHistory';

import packageJson from './package.json.link'; // Needed to create a symlink because of https://github.com/facebookincubator/create-react-app/issues/2466

import ewoloUtil from './common/ewoloUtil';
import ewoloConstants from './common/ewoloConstants';

import Header from './components/page/Header';
import AppNotification from './components/notification/AppNotification';
import Footer from './components/page/Footer';
import Privacy from './components/page/Privacy';
import Terms from './components/page/Terms';
import WhyEwolo from './components/page/WhyEwolo';
import ChangeLog from './components/page/ChangeLog';
import Welcome from './components/welcome/Welcome';
import LogWorkoutNew from './components/log-workout/LogWorkoutNew';
import LogWorkoutEdit from './components/log-workout/LogWorkoutEdit';
import Loader from './components/page/Loader';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import Dashboard from './components/dashboard/Dashboard';
import Account from './components/account/Account';

import appReducer from './modules/appReducer';
import createEwoloStore from './redux/createEwoloStore';

import * as appNotificationService from './services/appNotificationService'

import globalActions from './modules/global/globalActions';
import userDataActions from './modules/user-data/userDataActions';

import './App.css';
import './notifications.css';

const history = createHistory();

const store = createEwoloStore(appReducer, [routerMiddleware(history)]);

class App extends Component {

  componentDidMount() {

    // initialize authToken should really be the single source of truth
    const authToken = ewoloUtil.getObject(ewoloConstants.storage.authTokenKey);
    const id = ewoloUtil.getObject(ewoloConstants.storage.userIdKey);
    if (authToken && id) {
      store.dispatch(userDataActions.userAuthSuccess(authToken, id));
    }

    const appNotification = appNotificationService.getAppNotification();
    const appNotificationSeen = ewoloUtil.getObject(appNotification.id);

    if (appNotificationSeen === null) { // undefined means localStorage is disabled
      store.dispatch(globalActions.appNotificationSet(appNotification.id, appNotification.text, appNotification.showAll));
    }

    store.dispatch(userDataActions.fetchUserDataThunk());
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Loader/>
            <AppNotification/>
            <Header/>
            <Route exact path="/" component={Welcome}/>
            <Route exact path="/why-ewolo" component={WhyEwolo}/>
            <Route exact path="/privacy" component={Privacy}/>
            <Route exact path="/terms" component={Terms}/>
            <Route exact path="/change-log" component={ChangeLog}/>
            <Route exact path="/log-workout" component={LogWorkoutNew}/>
            <Route path="/edit-workout/:workoutId" component={LogWorkoutEdit}/>
            <Route exact path="/signup" component={Signup}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/logout" component={Logout}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/account" component={Account}/>
            <Footer
              clientVersion={packageJson.version}
              apiVersion={ewoloConstants.api.version}/>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

/*
history.listen((location) => {
  console.log('location', location); // TODO: Think about clearing the message bar when transitioning to certain states
  // TODO: save to localstorage on transition
});
*/

export default App;
