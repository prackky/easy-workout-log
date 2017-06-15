import fetch from 'isomorphic-fetch';

import ewoloConstants from './ewoloConstants';
import { RequestError } from './errorHandler';

const ewoloUtil = {
  getApiRequest: (route, method, body) => {
    const url = ewoloConstants.api.url + route;
    const headers = {
      'Content-Type': 'application/json'
    };
    headers[ewoloConstants.api.apiKeyHeader] = ewoloConstants.api.apiKey;

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
    return response.json();
  },
  validateEmail: (email) => {
    if (!email) {
      return 'Email is required.';
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
    if (window.localStorage) {
      window.localStorage.setItem(key, JSON.stringify(obj));
    }
  },
  getObject: (key) => {
    if (window.localStorage) {
      const value = window.localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
    }
    return null;
  }
};

export default ewoloUtil;
