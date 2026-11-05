const Joi = require('joi');
const ApiError = require('../errors/api-error');
const { messages, isHttpUrl } = require('../utils/constants');

const email = Joi.string().trim().lowercase().max(254)
  .email({ tlds: false })
  .required();
const password = Joi.string().max(72, 'utf8').required();
const url = Joi.string().trim().max(4096).custom((value, helpers) => (
  isHttpUrl(value) ? value : helpers.error('string.uri')
))
  .required();

const schemas = {
  signup: Joi.object({
    email,
    password: password.min(8),
    name: Joi.string().trim().min(2).max(30)
      .required(),
  }).required(),
  signin: Joi.object({ email, password }).required(),
  article: Joi.object({
    keyword: Joi.string().trim().max(200).required(),
    title: Joi.string().trim().max(1000).required(),
    text: Joi.string().trim().max(20000).required(),
    date: Joi.string().trim().max(100).required(),
    source: Joi.string().trim().max(500).required(),
    link: url,
    image: url,
  }).required(),
  articleParams: Joi.object({
    articleId: Joi.string().hex().length(24).required(),
  }).required(),
  authorization: Joi.string().pattern(/^Bearer [\w-]+\.[\w-]+\.[\w-]+$/i).required(),
};

function validate(target, schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[target]);
    if (error) {
      return next(new ApiError(400, messages.invalidInput));
    }
    req[target] = value;
    return next();
  };
}

module.exports = { validate, schemas };
