const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  episodeId: Number,
  showNotes: String
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
