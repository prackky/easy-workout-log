import fetch from 'isomorphic-fetch';

import ewoloConstants from './ewoloConstants';

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



};

export default ewoloUtil;
