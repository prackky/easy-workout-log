// import { push } from 'react-router-redux';

const signupActions = {
  signupSetData: (name, email, password) => {
    return {
      type: 'SIGNUP-SET-DATA',
      name: name,
      email: email,
      password: password
    };
  }
};

export default signupActions;
