import React from 'react';

const EwoloFormHint = (props) => {
  if (!props.formHint) {
    return null;
  }

  return (
    <div className="form-group form-input-hint fade-in">
      <div className="col-12 text-left">
        {props.formHint}
      </div>
    </div>
  )
};

export const EwoloFormHintSplit = (props) => {
  if (!props.formHint) {
    return null;
  }

  return (
    <div className="form-group form-input-hint fade-in">
      <div className="col-3"></div>
      <div className="col-9">
        {props.formHint}
      </div>
    </div>
  )
};

export default EwoloFormHint;
