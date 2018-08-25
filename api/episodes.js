const express = require('express');
const router = express.Router();
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
    Episode.findOne({episodeId: track.id}, (err, episode) => {
      if (!!err) {
        res.status(500).json(err);
      } else if (!episode) {
        res.status(404).json()
      } else {
        addShowNotes(episode);
        res.json(episode);
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
  Episode.findOneAndUpdate({episodeId: req.params.episodeId}, {$set: {showNotes: req.body.showNotes}}, {new: true}, (err, episode) => {
    if (!!err) {
      res.status(500).json(err);
    } else if (!episode) {
      res.status(404).json();
    } else {
      res.json(addShowNotes(episode));
    }
  });
});

router.use('/', async (req, res) => {
  try {
    Episode.find({}, (err, episodes) => {
      res.json(episodes.map(episode => addShowNotes(episode)));
    });
  } catch (e) {
    res.status(500).json(e)
  }
});

function addShowNotes(episode) {
  episode.showNotesHTML = '';
  if (!!episode.showNotes) {
    converter = converter || new showdown.Converter(converterOptions);
    episode.showNotesHTML = converter.makeHtml(episode.showNotes);
  }
  return episode;
}

module.exports = router;
