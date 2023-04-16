const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

module.exports = () => {
  mongoose.connect(
    MONGODB_URL,
    { useUnifiedTopology: true },
  );
};
