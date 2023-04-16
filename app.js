require('dotenv').config();
const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const { connect } = require('./config/db');
const { PORT } = require('./config/config');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');

const app = express();

app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

app.use(errors());

connect();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
