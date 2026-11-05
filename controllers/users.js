const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ApiError = require('../errors/api-error');
const { jwtSecret, jwtIssuer } = require('../config');
const { messages } = require('../utils/constants');

async function signup(req, res, next) {
  try {
    const { email, name, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = await User.create({ email, name, password: hash });
    return res.status(201).json({ _id: user.id, email: user.email, name: user.name });
  } catch (err) {
    return next(err);
  }
}

async function signin(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError(401, messages.invalidCredentials);
    }
    const token = jwt.sign({}, jwtSecret, {
      algorithm: 'HS256',
      issuer: jwtIssuer,
      subject: user.id,
      expiresIn: '7d',
    });
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}

async function getCurrentUser(req, res, next) {
  try {
    const user = await User.findById(req.userId).select('email name -_id').lean();
    if (!user) {
      throw new ApiError(404, messages.userNotFound);
    }
    return res.json(user);
  } catch (err) {
    return next(err);
  }
}

module.exports = { signup, signin, getCurrentUser };
