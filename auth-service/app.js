const express = require('express');
const cors = require('cors');
const boom = require('@hapi/boom');

const logger = require('./config/logger');
const rateLimiterMiddleware = require('./middlewares/rateLimiter.middleware');
const { env } = require('./config/constants');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(cors());
app.use(rateLimiterMiddleware);

app.post('/auth', function (req, res, next) {
  const streamkey = req.body.key;

  if (streamkey === env.SECERT_KEY) {
    return res.sendStatus(200);
  }

  next(boom.unauthorized());
});

app.use((err, req, res, next) => {
  if (!err.isBoom) {
    logger.error(err.message);
    const error = boom.badImplementation();
    return res.status(error.output.statusCode).json(error.output.payload);
  }

  res.status(err.output.statusCode).json(err.output.payload);
});

app.listen(env.PORT, function () {
  logger.info('Listening on port 8080!');
});
