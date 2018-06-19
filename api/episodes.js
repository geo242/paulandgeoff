const express = require('express');
const router = express.Router();
const soundcloud = require('../lib/soundcloud');
const Episode = require('./models/episode');
const showdown = require('showdown');

// route middleware to make sure a user is logged in
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(403).json();
};

router.get('/:episodeId', async (req, res) => {
  try {
    const track = await soundcloud.track(req.params.episodeId);
    if (!track) {
      return res.status(404).json();
    }
    Episode.findOne({episodeId: track.id}, (err, episode) => {
      if (!episode) {
        new Episode({episodeId: track.id})
          .save((err, newEpisode) => {
            res.json(newEpisode);
          });
      } else {
        if (!!episode.showNotes) {
          const converter = new showdown.Converter();
          track.showNotesHTML = converter.makeHtml(episode.showNotes);
        }
        res.json(track);
      }
    });
  } catch (e) {
    if (!!e && !!e.length && !!e[0] && !!e[0].error_message.indexOf('404') >= 0) {
      return res.status(404).json();
    }
    res.status(500).json(e);
  }
});

router.put('/:episodeId', isLoggedIn, (req, res) => {
  if (!req.body || !req.body.showNotes) {
    res.status(400).json();
    return;
  }
  Episode.findOneAndUpdate({episodeId: req.params.episodeId}, {$set: {showNotes: req.body.showNotes}}, {new: true}, (err, episode) => {
    if (!!err) {
      res.status(500).json(err);
    } else if (!episode) {
      res.status(404).json();
    } else {
      res.json(episode);
    }
  });
});

router.use('/', async (req, res) => {
  try {
    const tracks = await soundcloud.tracks();
    res.json(tracks);
  } catch (e) {
    res.status(500).json(e)
  }
});

module.exports = router;
