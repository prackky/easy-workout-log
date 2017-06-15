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

const ewoloTestUtil = {

};

export default ewoloTestUtil;
