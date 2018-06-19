'use strict';

// Production specific configuration
// ==================================
module.exports = {
  env: process.env.NODE_ENV,
  host: 'localhost',
  port: process.env.PORT || 9001,
  mongoUser: 'server',
  mongoUri: 'mongodb://ds163480.mlab.com:63480/heroku_h8rt5861'
};
