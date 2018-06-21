'use strict';

const enforce = require('express-sslify');
const bodyParser = require('body-parser');
const cors = require('./cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const authConfig = require('./auth');

module.exports = (app) => {
  if (process.env.NODE_ENV === 'production') {
    app.use(enforce.HTTPS());
  }
  app.use(morgan('dev'));
  app.use(cookieParser());
  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({extended: true}));

  app.use(cors);

  authConfig(app);

  app.use('/api', (req, res, next) => {
    res.type('json');
    next();
  });
};
