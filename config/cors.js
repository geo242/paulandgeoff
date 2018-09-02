'use strict';

/**
 * CORS configuration
 */

module.exports = function corsMiddleware(req, res, next) {
  res.header("Access-Control-Allow-Origin", process.env.NODE_ENV === 'production' ? 'https://www.paulandgeoff.com' : 'http://localhost:4200');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
};
