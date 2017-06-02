import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {applyMiddleware, createStore} from 'redux';

import './index.css';

import appReducer from './core/reducers/appReducer';

const store = createStore(appReducer, applyMiddleware(thunk, logger));

ReactDOM.render(
  <Provider store={store}>
  <App/>
</Provider>, document.getElementById('root'));
