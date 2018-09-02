const express = require('express');
const router = express.Router();
const TopicSuggestion = require('./models/topic-suggestion');

router.get('/', async (req, res) => {
  try {
    let results = await TopicSuggestion.find();
    results = [...results].map(ts => ({...ts.toJSON(), votes: ts.votes.length}));
    return res.status(200).json(results);
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.get('/my-vote', async (req, res) => {
  try {
    const result = await TopicSuggestion.findOne({sessionId: req.sessionID});
    return res.status(200).json({...result.toJSON(), votes: result.votes.length});
  } catch (e) {
    return res.status(500).json(e);
  }
});

router.post('/', async (req, res) => {
  try {
    const topic = (req.body.topic || '').trim().toLowerCase();
    if (!topic) {
      throw new Error('Topic is missing');
    }
    let topicSuggestion = await TopicSuggestion.findOne({topic: topic});
    if (!!topicSuggestion) {
      throw new Error('Topic has already been suggested');
    }

    const suggested = await TopicSuggestion.count({sessionId: req.sessionID});
    if (suggested >= 3) {
      throw new Error('Maximum suggestions received')
    }

    topicSuggestion = await TopicSuggestion.create({
      topic: topic,
      sessionId: req.sessionID,
      votes: [req.sessionID]
    });
    res.status(201).json({...topicSuggestion.toJSON(), votes: topicSuggestion.votes.length});
  } catch (e) {
    return res.status(500).json({message: e.message});
  }
});

router.post('/vote/:id', async (req, res) => {
  try {
    let topicSuggestion = await TopicSuggestion.findById(req.params.id);
    if (!topicSuggestion) {
      return res.status(404);
    }

    const votedOn = await TopicSuggestion.find({votes: {$in: [req.sessionID]}});
    for (let votedTopic of votedOn) {
      votedTopic.votes = votedTopic.votes.filter(v => v !== req.sessionID);
      await votedTopic.save();
    }

    req.session.topicVoteId = topicSuggestion.id;
    topicSuggestion.votes = (topicSuggestion.votes || [])
      .filter(sessionId => sessionId !== req.sessionID);
    topicSuggestion.votes.push(req.sessionID);
    topicSuggestion = await topicSuggestion.save();
    return res.status(200).json({...topicSuggestion.toJSON(), votes: topicSuggestion.votes.length});
  } catch (e) {
    return res.status(500).json(e);
  }
});

module.exports = router;
