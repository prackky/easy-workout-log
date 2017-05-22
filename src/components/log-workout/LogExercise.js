import React from 'react';
import {connect} from 'react-redux';

import './log-exercise.css';

const LogExercise = (props) => {

  return (
    <div className="exercise-entry">
      <div className="form-group">
        <div className="col-3">
          <label className="form-label">Exercise</label>
        </div>
        <div className="col-7">
          <input
            className="form-input input-lg"
            type="text"
            placeholder="Squats"
            value={props.exercise.name}/>
        </div>
        <div className="col-2 text-center">
          <button className="btn btn-action btn-lg circle btn-exercise-action">
            <i className="icon icon-delete"></i>
          </button>
        </div>

      </div>

      <div className="form-group">
        <div className="col-3">
          <label className="form-label">Reps</label>
        </div>
        <div className="col-3">
          <input className="form-input input-lg" type="text" placeholder="8"/>
        </div>
      </div>

      <div className="form-group">
        <div className="col-3">
          <label className="form-label">Weight</label>
        </div>
        <div className="col-3">
          <input className="form-input input-lg" type="text" placeholder="100"/>
        </div>
      </div>

      <div className="form-group">
        <div className="col-3">
          <label className="form-label">Sets</label>
        </div>
        <div className="col-3">
          <input className="form-input input-lg" type="text" placeholder="3"/>
        </div>
      </div>
    </div>
  );
};

export default LogExercise;
