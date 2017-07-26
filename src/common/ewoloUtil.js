import fetch from 'isomorphic-fetch';
import moment from 'moment';
import ReactDOM from 'react-dom';
import Chance from 'chance';

import ewoloConstants from './ewoloConstants';
import { RequestError } from './errorHandler';

// export const ewoloConstants;

const wrapLocalStorageAccess = (fn) => {
  try {
    return fn();
  } catch (e) {
    if (e && e.name === 'SecurityError') {
      console.log('Please enable cookies to be auto logged-in');
    } else {
      console.error(e);
    }
  }
}

const ewoloUtil = { 
  getApiRequest: ({ route, method, body, authToken }) => {
    const url = ewoloConstants.api.url + route;
    const headers = {
      'Content-Type': 'application/json'
    };
    headers[ewoloConstants.api.apiKeyHeader] = ewoloConstants.api.apiKey;
    if (authToken) {
      headers[ewoloConstants.api.authorizationHeader] = 'Bearer ' + authToken;
    }

    const options = {
      method: method,
      headers: headers
    };
    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(url, options);
  },
  getApiResponse: (response) => {
    if (response.status >= 400) {
      throw new RequestError(response);
    }

    if (response.status === 200 || response.status === 201) {
      return response.json();
    }

    return response.status;
  },
  getApiResponseStatus: (response) => {
    if (response.status >= 400) {
      throw new RequestError(response);
    }
    return Promise.resolve(response.status);
  },
  validateEmail: (email) => {
    if (!email) {
      return 'Email is required.';
    }
    return '';
  },
  validateRequired: (str, name) => {
    if (!str) {
      return `${name} is required.`;
    }
    return '';
  },
  validatePassword: (password) => {
    if (!password) {
      return 'Password is required.';
    }

    if (password.length < 8) {
      return 'Password must be minimum 8 characters in length.';
    }

    return '';
  },
  // Note that stringify and parse may block the main thread
  // Also, consider using cookies for auth token storage: https://stormpath.com/blog/where-to-store-your-jwts-cookies-vs-html5-web-storage
  storeObject: (key, obj) => {
    const fn = () => {
      if (window.localStorage) {
        window.localStorage.setItem(key, JSON.stringify(obj));
      }
    }

    return wrapLocalStorageAccess(fn);
  },
  getObject: (key) => {
    const fn = () => {
      if (window.localStorage) {
        const value = window.localStorage.getItem(key);
        if (value) {
          return JSON.parse(value);
        }
      }

      return null;
    }

    return wrapLocalStorageAccess(fn);
  },
  removeObject: (key) => {
    const fn = () => {
      if (window.localStorage) {
        window.localStorage.removeItem(key);
      }
    }

    return wrapLocalStorageAccess(fn);
  },
  getTodaysDate: () => {
    return moment().format('YYYY-MM-DD');
  },
  scrollElementIntoView: (element) => {
    setTimeout(() => {
      ReactDOM
        .findDOMNode(element)
        .scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 0);
  },
  chance: new Chance(),
  unitsToText: (units) => {
    if (units === 1) {
      return 'lbs';
    }

    return 'kgs';
  },
  textToSex: (sex) => {
    if (sex === 'male') {
      return 2;
    }

    if (sex === 'female') {
      return 3;
    }

    return 1;
  },
  isMobileDevice: () => {
    return window.screen.width < 600;
  }
};

export default ewoloUtil;
