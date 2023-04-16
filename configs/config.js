module.exports = {
  PORT: process.env.PORT || 3000,
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET: process.env.JWT_SECRET || 'dev-secret',
};
