const SC = require('node-soundcloud');
const request = require('request');

(function (soundcloud) {
  soundcloud.init = () => {
    SC.init({
      id: process.env.SC_CLIENT_ID,
      secret: process.env.SC_SECRET
    });
  };

  soundcloud.tracks = () => {
    return new Promise((resolve, reject) => {
      SC.get(`/users/${process.env.SC_USER}/tracks`, (err, tracks) => {
        if (!!err) {
          reject(err);
          return;
        }
        const promises = tracks.map(track => {
          return new Promise((innerResolve, innerReject) => {
            request(track.waveform_url.replace('.png', '.json'), {json: true}, (err, res, body) => {
              if (!!err) {
                innerReject(err);
              } else {
                innerResolve(body);
                track.waveform_data = body;
              }
            });
          })
        });
        Promise.all(promises)
          .then(() => {
            resolve(tracks);
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  };

  soundcloud.track = (trackId) => {
    return new Promise((resolve, reject) => {
      SC.get(`/users/${process.env.SC_USER}/tracks/${trackId}`, (err, track) => {
        if (!!err) {
          reject(err);
          return;
        }
        request(track.waveform_url.replace('.png', '.json'), {json: true}, (err, res, body) => {
          if (!!err) {
            reject(err);
          } else {
            track.waveform_data = body;
            resolve(track);
          }
        });
      });
    });
  }
}(module.exports));
