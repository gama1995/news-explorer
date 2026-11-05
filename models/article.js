const mongoose = require('mongoose');
const { isHttpUrl } = require('../utils/constants');

const articleSchema = new mongoose.Schema({
  keyword: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  text: { type: String, required: true, trim: true },
  date: { type: String, required: true, trim: true },
  source: { type: String, required: true, trim: true },
  link: { type: String, required: true, validate: isHttpUrl },
  image: { type: String, required: true, validate: isHttpUrl },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

articleSchema.index({ owner: 1, _id: -1 });

module.exports = mongoose.model('Article', articleSchema);
