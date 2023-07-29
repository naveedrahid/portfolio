const User = require('../models/user');

const portfolioView = (req, res) => {
    res.render('portfolio/portfolio');
}

module.exports = {
    portfolioView,
}