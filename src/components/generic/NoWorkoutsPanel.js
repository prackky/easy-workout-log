import React from 'react';

const NoWorkoutsPanel = (props) => {

  const handleBtnLogWorkoutClick = (event) => {
    event.preventDefault();
    props
      .history
      .push('/log-workout');
  }

  return (
    <div className="columns col-12">
      <div className="empty width-100">
        <div className="empty-icon">
          <i className="icon icon-flag"></i>
        </div>
        <h4 className="empty-title">You have no workouts logged</h4>
        <div className="empty-subtitle">Click the button to log a new workout</div>
        <div className="empty-action">
          <button className="btn btn-primary" onClick={handleBtnLogWorkoutClick}>Log Workout</button>
        </div>
      </div>
    </div>
  );
};

export default NoWorkoutsPanel;