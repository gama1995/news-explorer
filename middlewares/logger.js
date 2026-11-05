const { createLogger, format, transports } = require('winston');

const requestLogger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: 'request.log' })],
});

const errorLogger = createLogger({
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.File({ filename: 'error.log' })],
});

function requestDetails(req) {
  return { method: req.method, path: req.originalUrl.split('?')[0] };
}

function logRequest(req, res, next) {
  const start = Date.now();
  res.once('finish', () => {
    requestLogger.info('Request completed', {
      ...requestDetails(req),
      status: res.statusCode,
      durationMs: Date.now() - start,
    });
  });
  next();
}

function logError(err, req, status) {
  errorLogger.error('Request failed', {
    ...requestDetails(req),
    status,
    type: err.name,
    code: typeof err.code === 'number' ? err.code : undefined,
  });
}

module.exports = { logRequest, logError };
