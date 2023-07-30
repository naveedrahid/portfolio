const Portfolio = require("../models/portfolio");

const portfolioView = (req, res) => {
  const basePath = '/uploads/';
    Portfolio.find({})
    .then((portfolioData) => {
      res.render('portfolio/portfolio', { portfolioData ,basePath});
    })
    .catch((error) => {
      console.error('Error fetching data from the database:', error);
      res.status(500).send('Internal Server Error');
    });
    // res.render('portfolio/portfolio');
}

module.exports = {
    portfolioView,
}