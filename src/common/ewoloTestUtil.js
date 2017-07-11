import configureMockStore from 'redux-mock-store';
import thunk from '../redux/middleware/thunk';

import jwtDecode from 'jwt-decode';

import ewoloConstants from './ewoloConstants';
import { workout } from './testData';

let localStorage = {};

export const localStorageMock = {
  setItem(key, value) {
    return Object.assign(localStorage, {
      [key]: value
    });
  },
  getItem(key) {
    return localStorage[key];
  },
  clear() {
    localStorage = {};
  }
};

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZjgzZjczM2FkZGMxZjYiLCJpYXQiOjE0OTc4MTgyNzUsImV4cCI6MTUyOTM3NTg3NX0.iKCvQxPbkv-D5lQbocHIVLhNqnqCU7o__Zo84HvmR8Y';


const middlewares = [thunk];

const ewoloTestUtil = {
  authToken: authToken,
  authTokenUserId: jwtDecode(authToken).id,
  getMockStore: () => {
    return configureMockStore(middlewares);
  },
  workoutsAnalysisResponseData: [
    ['2012-01-01', 65],
    ['2017-01-23', 70],
    ['2017-03-15', 57.7],
    ['2017-03-17', 60],
    ['2017-05-23', 60.5],
    ['2017-06-26', 67]
  ],
  mock: {
    workout: workout
  }
};

export default ewoloTestUtil;
