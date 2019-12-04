const mongoose = require('mongoose');
const soundcloud = require('./soundcloud');
const Episode = require('../api/models/episode');

((db) => {
  db.init = (config) => {
    const password = process.env.DB_PASSWORD || '';
    console.log('PASSWORD', password);
    const user = process.env.DB_USER || config.mongoUser;
    mongoose.connection.on('error', (error) => {
      console.error('MONGOOSE CONNECTION ERROR', error);
    });
    mongoose.connect(config.mongoUri, {
      user: user,
      pass: password
    }, async () => {
      console.log('MONGO CONNECTED');
      if (process.env.NODE_ENV !== 'production') {
        return;
      }
      console.log('Getting tracks...');
      let tracks = await soundcloud.tracks();
      console.log('Found tracks');
      for (const track of tracks) {
        console.log('Updating track id', track.id);
        Episode.findOneAndUpdate({episodeId: track.id}, {
            $set: {
              episodeId: track.id,
              createdAt: new Date(track.created_at),
              lastModified: new Date(track.last_modified),
              duration: track.duration,
              waveform: track.waveform_data,
              description: track.description,
              title: track.title,
              streamable: !!track.streamable,
              streamUrl: track.stream_url
            }
          }, {
            new: true,
            upsert: true
          }, (err, episode) => {
            if (!!err) {
              console.error(err);
            } else if (!!episode) {
              console.log('Updated episode: ', episode.episodeId);
            } else {
              console.log('Episode is null', episode);
            }
          });
      }
    });
  };
})(module.exports);
