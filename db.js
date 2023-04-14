const mongoose = require('mongoose');
const { MONGODB_URL } = require('./config');

module.exports.connect = () => {
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};
