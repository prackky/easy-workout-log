import reduxLogger from 'redux-logger';
import { applyMiddleware, createStore, compose } from 'redux';

import thunk from './middleware/thunk';
import analytics from './middleware/analytics';
import authenticatedRoutesCheck from './middleware/authenticated-routes-check';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createEwoloStore = (appReducer, extraMiddleWare) => {
  // const storeMiddlware = [routerMiddleware(history), thunk, authenticatedRoutesCheck];
  const storeMiddlware = [...extraMiddleWare, thunk, authenticatedRoutesCheck];

  // only enable state logging in debug
  if (process.env.NODE_ENV !== 'production') {
    storeMiddlware.push(reduxLogger);
  }

  // only enable analytics in production
  if (process.env.NODE_ENV === 'production') {
    storeMiddlware.push(analytics);
  }

  const store = createStore(appReducer, composeEnhancers(applyMiddleware(...storeMiddlware)));

  return store;
}

export default createEwoloStore;
