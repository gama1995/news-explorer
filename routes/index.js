const router = require('express').Router();
const users = require('./users');
const articles = require('./articles');
const { signin, signup } = require('../controllers/users');
const authenticate = require('../middlewares/auth');
const { schemas, validate } = require('../middlewares/validate');
const ApiError = require('../errors/api-error');
const { messages } = require('../utils/constants');

router.post('/signup', validate('body', schemas.signup), signup);
router.post('/signin', validate('body', schemas.signin), signin);

router.use(authenticate);
router.use('/users', users);
router.use('/articles', articles);
router.use((req, res, next) => next(new ApiError(404, messages.routeNotFound)));

module.exports = router;
