import React from 'react';

import ewoloUtil from '../../common/ewoloUtil';
import ewoloConstants from '../../common/ewoloConstants';

class Logout extends React.Component {

  componentDidMount() {
    ewoloUtil.removeObject(ewoloConstants.storage.authTokenKey);
    ewoloUtil.removeObject(ewoloConstants.storage.userIdKey);
    setTimeout(() => {
      window.location.href = '/';
    }, 0);
  }

  render() {
    return null;
  }
};

export default Logout;
