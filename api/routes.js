'use strict';

const express = require('express');
const episodesApi = require('./episodes');
const path = require('path');

module.exports = (app) => {
  const publicPath = path.resolve(__dirname, '../public');
  app.use(express.static(publicPath));
  app.use('/api/episodes', episodesApi);
  app.use('*', (req, res) => {
    res.sendFile(path.resolve(publicPath, 'index.html'));
  });
};
