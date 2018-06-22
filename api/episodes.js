const express = require('express');
const router = express.Router();
const soundcloud = require('../lib/soundcloud');
const Episode = require('./models/episode');
const showdown = require('showdown');
let converter = undefined;
const converterOptions = {
  excludeTrailingPunctuationFromURLs: true,
  strikethrough: true,
  disableForced4SpacesIndentedSublists: true,
  simpleLineBreaks: true,
  openLinksInNewWindow: true,
  emoji: true
};
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
        addShowNotes(track, episode);
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

router.put('/:episodeId', isLoggedIn, async (req, res) => {
  if (!req.body || req.body.showNotes === undefined) {
    res.status(400).json();
    return;
  }
  const track = await soundcloud.track(req.params.episodeId);
  Episode.findOneAndUpdate({episodeId: req.params.episodeId}, {$set: {showNotes: req.body.showNotes}}, {new: true}, (err, episode) => {
    if (!!err) {
      res.status(500).json(err);
    } else if (!episode) {
      res.status(404).json();
    } else {
      res.json(addShowNotes(track, episode));
    }
  });
});

router.use('/', async (req, res) => {
  try {
    let tracks = await soundcloud.tracks();
    const ids = tracks.map(track => track.id);
    Episode.find({'episodeId': {$in: ids}}, (err, episodes) => {
      tracks = tracks.map(track => {
        const episode = episodes.find(e => e.episodeId === track.id);
        addShowNotes(track, episode);
        return track;
      });
      res.json(tracks);
    });
  } catch (e) {
    res.status(500).json(e)
  }
});

function addShowNotes(track, episode) {
  track.showNotes = episode.showNotes || '';
  track.showNotesHTML = '';
  if (!!track.showNotes) {
    converter = converter || new showdown.Converter(converterOptions);
    track.showNotesHTML = converter.makeHtml(track.showNotes);
  }
  return track;
}

module.exports = router;
