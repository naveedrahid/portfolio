const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: Boolean,
  featuredimage: String,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;