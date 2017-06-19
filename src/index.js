import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';

import './index.css';

import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import App from './App';

import ReactGA from 'react-ga';
ReactGA.initialize('UA-41172423-4');

// ReactDOM.render(
render(
  <App/>, document.getElementById('root'));
