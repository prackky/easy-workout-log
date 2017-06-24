import ExerciseService from '../services/ExerciseService';

const apiVersion = 'v1';
const exerciseService = new ExerciseService();

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
  exerciseNames: exerciseService.exercises
});

export default ewoloConstants;
