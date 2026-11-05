const { rateLimit } = require('express-rate-limit');
const { messages } = require('../utils/constants');
const ApiError = require('../errors/api-error');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res, next) => next(new ApiError(429, messages.rateLimit)),
});
