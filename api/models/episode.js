const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const episodeSchema = new Schema({
  episodeId: Number,
  createdAt: Date,
  lastModified: Date,
  duration: Number,
  showNotes: String,
  waveform: Schema.Types.Mixed,
  streamable: Boolean,
  description: String,
  title: String,
  streamUrl: String,
});

const Episode = mongoose.model('Episode', episodeSchema);

module.exports = Episode;
