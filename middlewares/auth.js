const jwt = require('jsonwebtoken');
const { jwtSecret, jwtIssuer } = require('../config');
const { schemas } = require('./validate');
const ApiError = require('../errors/api-error');
const { messages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { error, value } = schemas.authorization.validate(req.get('Authorization'));
  if (error) {
    return next(new ApiError(401, messages.unauthorized));
  }

  try {
    const claims = jwt.verify(value.slice(7), jwtSecret, {
      algorithms: ['HS256'],
      issuer: jwtIssuer,
    });
    if (typeof claims.sub !== 'string' || !/^[a-f\d]{24}$/i.test(claims.sub)) {
      throw new Error('Invalid token subject');
    }
    req.userId = claims.sub;
  } catch {
    return next(new ApiError(401, messages.unauthorized));
  }
  return next();
};
