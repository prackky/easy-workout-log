const apiVersion = 'v1';

const ewoloConstants = Object.freeze({
  api: {
    authorizationHeader: 'authorization',
    apiKeyHeader: 'api-key',
    apiKey: 'ewolo-general',
    version: apiVersion,
    url: process.env.NODE_ENV === 'production' ? '/api/' + apiVersion : 'http://localhost:4000/api/' + apiVersion // TODO: fix mocking of relative urls, https://github.com/wheresrhys/fetch-mock/issues/46
  },
  storage: {
    authTokenKey: 'EWOLO-AUTH-TOKEN',
    userIdKey: 'EWOLO-USER-ID'
  },
  exerciseNames: [
    'Bench press',
    'Standing barbell shoulder press',
    'Deadlift',
    'Standing dumbell curls',
    'Seated barbell shoulder press',
    'Seated shoulder press',
    'Seated military press'
  ]
});

export default ewoloConstants;
