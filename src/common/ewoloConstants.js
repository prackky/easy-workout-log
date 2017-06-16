const ewoloConstants = Object.freeze({
  api: {
    authorizationHeader: 'authorization',
    apiKeyHeader: 'api-key',
    apiKey: 'ewolo-general',
    url: process.env.NODE_ENV === 'production' ? '/api/v1' : 'http://localhost:4000/api/v1' // TODO: fix mocking of relative urls, https://github.com/wheresrhys/fetch-mock/issues/46
  },
  storage: {
    authTokenKey: 'EWOLO-AUTH-TOKEN'
  },
  allExercises: [
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
