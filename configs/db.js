const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

module.exports = () => {
  mongoose.connect(
    MONGODB_URL,
    { useUnifiedTopology: true },
  )
    .catch((error) => {
      console.error('Error connecting to the database:', error.message);
    });
};
