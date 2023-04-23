const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

module.exports = (app) => {
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }));
  app.use(helmet());
  // TODO: config cors when frontend will be ready
  app.use(cors({ origin: '*' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
};
