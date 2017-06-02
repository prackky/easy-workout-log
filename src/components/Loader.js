import React from 'react';
import {connect} from 'react-redux';

import './loader.css';

const mapStateToProps = (state) => {
  return {loadingCounter: state.global.loadingCounter};
};

const Loader = (props) => {
  if (props.loadingCounter) {
    return (
      <div className="ewolo-loading"></div>
    );
  }

  return null;
}

export default connect(mapStateToProps)(Loader);
