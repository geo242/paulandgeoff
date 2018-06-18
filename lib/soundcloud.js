const SC = require('node-soundcloud');

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
        resolve(tracks);
      });
    });
  }
}(module.exports));
