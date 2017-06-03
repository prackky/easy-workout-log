const ewoloConstants = Object.freeze({
  api: {
    apiKeyHeader: 'api-key',
    apiKey: 'ewolo-general',
    url: process.env.NODE_ENV === 'production' ? 'http://localhost:9000/api/v1' : 'http://localhost:9000/api/v1'
  }
});

export default ewoloConstants;
