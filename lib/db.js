const mongoose = require('mongoose');

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
      pass: password,
    }, (error) => {
      console.log('MONGO CONNECTED');
    });
  };
})(module.exports);
