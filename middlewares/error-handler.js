const ApiError = require('../errors/api-error');
const { logError } = require('./logger');
const { messages } = require('../utils/constants');

module.exports = (err, req, res, next) => {
  let status = 500;
  let message = messages.serverError;

  if (err instanceof ApiError) {
    ({ status, message } = err);
  } else if (err.code === 11000) {
    status = 409;
    message = messages.duplicateEmail;
  } else if (err.type === 'entity.too.large') {
    status = 413;
    message = messages.payloadTooLarge;
  } else if (
    (err.status >= 400 && err.status < 500)
    || err.name === 'ValidationError'
    || err.name === 'CastError'
  ) {
    status = 400;
    message = messages.invalidInput;
  }

  logError(err, req, status);
  if (res.headersSent) {
    return next(err);
  }
  return res.status(status).json({ message });
};
