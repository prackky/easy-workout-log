import React from 'react';

import './ChangeLog.css';

const ChangeLog = (props) => {

  return (
    <div className="container grid-960 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3 className="text-center">Change Log</h3>

          <h5 className="margin-top-5rem">Version 1.0.1</h5>
          <ul className="change-log">
            <li>Workout operations menu</li>
            <li>Copy workouts</li>
            <li>Edit workouts</li>
            <li>Improved user notifications</li>
            <li>Why Ewolo?</li>
          </ul>
          <h5 className="margin-top-5rem">Version 0.4.0</h5>
          <ul className="change-log">
            <li>Super-set indicators on logging and viewing workouts</li>
            <li>Tighter workout view</li>
            <li>Change log</li>
            <li>Additional welcome page progress graphic + copy</li>
          </ul>
          
        </div>
      </div>

    </div>
  );

}

export default ChangeLog;
