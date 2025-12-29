// Vercel serverless function wrapper for Express app
const app = require('../backend/src/app');

// Export the Express app as a serverless function
module.exports = (req, res) => {
  return app(req, res);
};

