import ExerciseService from '../services/ExerciseService';

const apiVersion = 'v2';
const exerciseService = new ExerciseService();

const ewoloConstants = Object.freeze({
  api: {
    authorizationHeader: 'authorization',
    apiKeyHeader: 'api-key',
    apiKey: 'ewolo-general',
    version: apiVersion,
    url: process.env.NODE_ENV === 'production' ? '/api/' + apiVersion : 'http://192.168.42.10:4000/api/' + apiVersion // TODO: fix mocking of relative urls, https://github.com/wheresrhys/fetch-mock/issues/46
  },
  storage: {
    authTokenKey: 'EWOLO-AUTH-TOKEN',
    userIdKey: 'EWOLO-USER-ID'
  },
  exerciseNames: Array.from(exerciseService.exercises)
});

export default ewoloConstants;
