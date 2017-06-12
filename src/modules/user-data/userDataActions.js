// import { push } from 'react-router-redux';

const userDataActions = {
  userAuthSuccess: (authToken) => {
    return {
      type: 'USER-DATA-AUTH-SUCCESS',
      authToken: authToken
    };
  }
};

export default userDataActions;
