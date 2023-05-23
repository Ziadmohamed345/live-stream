const Redis = require('ioredis');

const logger = require('./logger');

const redisClient = new Redis({});

redisClient.on('connect', () => {
  logger.info('connected to Redis');
});

redisClient.on('error', (err) => {
  logger.error(err);
});

module.exports = redisClient;
