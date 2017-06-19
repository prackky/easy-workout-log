import 'spectre.css/dist/spectre.css';
import 'spectre.css/dist/spectre-exp.css';
import 'spectre.css/dist/spectre-icons.css';

import './index.css';

import React from 'react';
// import ReactDOM from 'react-dom';
import { render } from 'react-snapshot';
import App from './App';

// ReactDOM.render(
render(
  <App/>, document.getElementById('root'));
