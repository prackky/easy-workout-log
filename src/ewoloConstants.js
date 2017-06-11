const ewoloConstants = Object.freeze({
  api: {
    apiKeyHeader: 'api-key',
    apiKey: 'ewolo-general',
    url: process.env.NODE_ENV === 'production' ? 'http://localhost:9000/api/v1' : 'http://localhost:9000/api/v1'
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
