const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

module.exports = () => {
  mongoose.connect(
    MONGODB_URL,
    { useUnifiedTopology: true },
  )
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Database connected successfully');
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.error('Error connecting to the database:', error.message);
    });
};
