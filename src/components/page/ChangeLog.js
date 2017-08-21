import React from 'react';

import './ChangeLog.css';

const ChangeLog = (props) => {

  return (
    <div className="container grid-640 section-content">
      <div className="columns">
        <div className="column col-12">
          <h3>Change Log</h3>

          <h5 className="margin-top-5rem">Version 3.1.0 (2017-08-21)</h5>
          <ul className="change-log">
            <li>Brand new analytics section!</li>
            <li>Ability to mark exercises as done</li>
          </ul>

          <h5 className="margin-top-5rem">Version 2.6.5 (2017-08-12)</h5>
          <ul className="change-log">
            <li>Dashboard progress filters: date range, exercise names</li>
            <li>Standardized dropdown menus (click to close and open)</li>
          </ul>

          <h5 className="margin-top-5rem">Version 2.4.0 (2017-07-24)</h5>
          <ul className="change-log">
            <li>Add user avatars (can be changed in settings)</li>
            <li>Improve dashboard performance</li>
            <li>Add a clear button for quick exercise name entry</li>
          </ul>

          <h5 className="margin-top-5rem">Version 2.3.0 (2017-07-23)</h5>
          <ul className="change-log">
            <li>Enable zooming and panning for progress charts</li>
            <li>Set dashboard to home page when logged in</li>
            <li>Improved longform text legibility</li>
            <li>Allow canceling a workout in edit mode</li>
            <li>Add inspirational quotes when logging a new workout</li>
            <li>Add blog post!</li>
          </ul>
          
          <h5 className="margin-top-5rem">Version 2.1.0</h5>
          <ul className="change-log">
            <li>Support for global notifications</li>
          </ul>
          
          <h5 className="margin-top-5rem">Version 2.0.0</h5>
          <ul className="change-log">
            <li>Enable setting custom weight units for exercises</li>
            <li>Enable updating account settings including name and default weight units</li>
          </ul>
          
          <h5 className="margin-top-5rem">Version 1.1.0</h5>
          <ul className="change-log">
            <li>Split workout display by month</li>
            <li>Update exercise list with current entries when logging a workout</li>
            <li>Enable account password updates</li>
          </ul>
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
