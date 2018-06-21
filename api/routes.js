'use strict';

const express = require('express');
const episodesApi = require('./episodes');
const path = require('path');
const favicon = require('express-favicon');

module.exports = (app) => {
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));
  app.use(favicon(path.resolve(__dirname, '../public/assets/icons/favicon.ico')));
  app.use('/api/episodes', episodesApi);
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
  });
};
