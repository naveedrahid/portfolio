const Portfolio = require("../models/portfolio");

const portfolioView = (req, res) => {
  const basePath = '/uploads/';
  Portfolio.find({})
    .then((portfolioData) => {
      res.render('portfolio/portfolio', { portfolioData, basePath });
    })
    .catch((error) => {
      console.error('Error fetching data from the database:', error);
      res.status(500).send('Internal Server Error');
    });
}

const portfolioUpdateStatus = async (req, res) => {
  const itemId = req.body.itemId;
  console.log('Received itemId:', itemId);

  try {
    const portfolioData = await Portfolio.findById(itemId);
    console.log('Portfolio data:', portfolioData); // Check the value of portfolioData

    // Rest of the code...
  } catch (error) {
    console.log('Error updating status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  portfolioView,
  portfolioUpdateStatus,
}