require('dotenv').config();

module.exports.env = {
  PORT: process.env.PORT || 8080,
  SECERT_KEY: process.env.SECERT_KEY,
};

module.exports.constants = {
  RATE_LIMITER_POINTS: 20,
  RATE_LIMITER_DURATION: 1,
  RATE_LIMITER_BLOCK_DURATION: 60 * 5,
  RATE_LIMITER_PERFIX: 'RL_',
};
