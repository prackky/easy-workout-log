import React, { Component } from 'react';

import Header from './components/Header';
import Welcome from './components/Welcome';

import './App.css';


class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Welcome />
      </div>
    );
  }
}

export default App;
