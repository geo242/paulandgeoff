'use strict';

/**
 * Main application file
 */

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const express = require('express');
const http = require('http');
const colors = require('colors/safe');
const _ = require('lodash');

const config = require('./config/environment/' + process.env.NODE_ENV);
const expressConfig = require('./config/express');
const routes = require('./api/routes');
const soundcloud = require('./lib/soundcloud');
soundcloud.init();

const db = require('./lib/db');
db.init(config);

// package.json information
const pjson = require('./package.json');

// Setup server
const app = express();
app.locals.title = _.startCase('paulandgeoff');
expressConfig(app);
const server = http.createServer(app);
routes(app);

// Start server
server.listen(config.port, function paulandgeoffServer() {
  console.log('\n' + colors
    .green('---------------------------------------------------------------------------'));

  console.log(' ' + app.locals.title + ' server v' + pjson.version + ' is listening on ' +
    colors.green('http://%s:%s') + ' in ' +
    colors.white.bgBlue('%s') + ' mode.',
    config.host, config.port, config.env);

  console.log(colors
    .green('---------------------------------------------------------------------------\n'));
});

// Expose app
module.exports = app;
