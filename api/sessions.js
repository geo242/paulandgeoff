const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({sessionId: req.sessionID, topicVoteId: req.session.topicVoteId});
});

module.exports = router;
