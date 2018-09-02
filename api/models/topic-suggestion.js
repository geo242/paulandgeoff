const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const topicSuggestionSchema = new Schema({
  topic: String,
  sessionId: String,
  votes: [String]
}, {timestamps: true});

const TopicSuggestion = mongoose.model('TopicSuggestion', topicSuggestionSchema);

module.exports = TopicSuggestion;
