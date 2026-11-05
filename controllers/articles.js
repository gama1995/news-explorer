const Article = require('../models/article');
const ApiError = require('../errors/api-error');
const { messages } = require('../utils/constants');

async function listArticles(req, res, next) {
  try {
    const articles = await Article.find({ owner: req.userId }).sort({ _id: -1 }).lean();
    return res.json(articles);
  } catch (err) {
    return next(err);
  }
}

async function createArticle(req, res, next) {
  try {
    const article = await Article.create({ ...req.body, owner: req.userId });
    return res.status(201).json(article);
  } catch (err) {
    return next(err);
  }
}

async function deleteArticle(req, res, next) {
  try {
    const { articleId } = req.params;
    const article = await Article.findOneAndDelete({ _id: articleId, owner: req.userId });
    if (!article) {
      const exists = await Article.exists({ _id: articleId });
      throw exists
        ? new ApiError(403, messages.forbidden)
        : new ApiError(404, messages.articleNotFound);
    }
    return res.json(article);
  } catch (err) {
    return next(err);
  }
}

module.exports = { listArticles, createArticle, deleteArticle };
