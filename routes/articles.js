const router = require('express').Router();
const { listArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { schemas, validate } = require('../middlewares/validate');

router.get('/', listArticles);
router.post('/', validate('body', schemas.article), createArticle);
router.delete('/:articleId', validate('params', schemas.articleParams), deleteArticle);

module.exports = router;
