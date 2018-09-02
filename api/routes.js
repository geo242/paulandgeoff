'use strict';

const express = require('express');
const episodesApi = require('./episodes');
const topicSuggestionsApi = require('./topic-suggestions');
const sessions = require('./sessions');
const path = require('path');
const favicon = require('express-favicon');

module.exports = (app) => {
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));
  app.use(favicon(path.resolve(__dirname, '../public/assets/icons/favicon.ico')));
  app.use('/api/episodes', episodesApi);
  app.use('/api/topic-suggestions', topicSuggestionsApi);
  app.use('/api/session', sessions);
  app.use('*', (req, res) => {
    if (req.session.views) {
      req.session.views++;
    } else {
      req.session.views = 1;
    }
    res.sendFile(path.resolve(publicPath, 'index.html'));
  });
};
