const express = require('express');
const router = express.Router();
const soundcloud = require('../lib/soundcloud');

router.use('/', async (req, res) => {
  try {
    const tracks = await soundcloud.tracks();
    res.json(tracks);
  } catch (e) {
    res.status(500).json(e)
  }
});

module.exports = router;
