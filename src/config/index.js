module.exports = {
  SERVER: {
    url: process.env.SERVER_URL || 'http://localhost:2001',
    apiPath: process.env.API_PATH || '/api/v1'
  },
  ...require('./constants')
};
