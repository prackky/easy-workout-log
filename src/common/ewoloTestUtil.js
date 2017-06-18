import jwtDecode from 'jwt-decode';

import ewoloConstants from './ewoloConstants';

let localStorage = {};

export const localStorageMock = {
  setItem(key, value) {
    return Object.assign(localStorage, {
      [key]: value });
  },
  getItem(key) {
    return localStorage[key];
  },
  clear() {
    localStorage = {};
  }
};

const authToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNmZjgzZjczM2FkZGMxZjYiLCJpYXQiOjE0OTc4MTgyNzUsImV4cCI6MTUyOTM3NTg3NX0.iKCvQxPbkv-D5lQbocHIVLhNqnqCU7o__Zo84HvmR8Y';

const ewoloTestUtil = {
  authToken: authToken,
  authTokenUserId: jwtDecode(authToken).id
};

export default ewoloTestUtil;
