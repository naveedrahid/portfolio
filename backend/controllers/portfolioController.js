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
  try {
    const portfolioItem = await Portfolio.findById(itemId);
    if (!portfolioItem) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    portfolioItem.status = !portfolioItem.status;
    await portfolioItem.save();
    return res.status(200).json({ status: portfolioItem.status });
  } catch (err) {
    console.error('Error updating status:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  portfolioView,
  portfolioUpdateStatus
}