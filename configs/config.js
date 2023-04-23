module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/bitfilmsdb',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
};
