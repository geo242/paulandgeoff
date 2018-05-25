'use strict';

// Production specific configuration
// ==================================
module.exports = {
    env: process.env.NODE_ENV,
    host: 'localhost',
    port: process.env.PORT || 9001,
};
