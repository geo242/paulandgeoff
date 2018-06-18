'use strict';

const express = require('express');
const episodesApi = require('./episodes');
const path = require('path');

module.exports = (app) => {
  const publicPath = path.resolve(__dirname, '../public');
  console.log('Setting up routes...', publicPath);
  app.use(express.static(publicPath));
  app.use('/api/episodes', episodesApi);
};
