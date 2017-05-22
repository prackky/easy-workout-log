import React from 'react';

import './welcome.css';

const Welcome = () => {
  return (
    <div className="container grid-1280">
      <div className="columns">
        <div className="column col-12">
          <div className="text-center">
          <h2>Easy workout log</h2>
          <h4>Progress tracking made simple</h4> {/* background image this with a logo */}
          <button className="btn btn-primary btn-welcome-log-workout">Log a workout</button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Welcome;
