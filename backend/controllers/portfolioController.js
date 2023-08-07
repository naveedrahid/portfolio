const Portfolio = require("../models/portfolio");
const { uploadFeaturedImage } = require("../utils/multerConstant");

const portfolioController = {
  index: (req, res) => {
    const basePath = '/uploads/';
    Portfolio.find({})
      .then((portfolioItems) => {
        res.render('portfolio/portfolio', { portfolioItems, basePath });
      }).catch((err) => {
        res.status(500).json({ message: 'Error fetching data from MongoDB' });
      });

  },

  create: (req, res) => {
    uploadFeaturedImage(req, res, async (err) => {
      if (err) {
        console.error('Error uploading featured image:', err);
        return res.status(500).json({ error: 'An error occurred while uploading the image' });
      }

      const { add_title, add_desc, select_status } = req.body;
      const featuredimage = req.file ? req.file.filename : null;

      try {
        const newPortfolio = new Portfolio({
          title: add_title,
          description: add_desc,
          status: select_status === 'Active',
          featuredimage,
        });

        await newPortfolio.save();
        return res.status(201).json(newPortfolio);
      } catch (err) {
        console.error('Error saving the portfolio:', err);
        return res.status(500).json({ error: 'An error occurred while saving the portfolio' });
      }
    });
  },
  portfolioUpdateStatus: (req, res) => {
    const itemId = req.body.itemId;
    Portfolio.findById(itemId)
      .then((portfolioItem) => {
        if (!portfolioItem) {
          return res.status(404).json({ message: 'Portfolio item not found' });
        }
        portfolioItem.status = !portfolioItem.status;
        return portfolioItem.save();
      }).then((updatedPortfolioItem) => {
        return res.status(200).json({ status: updatedPortfolioItem.status });
      }).catch((err) => {
        console.error('Error updating status:', err);
        return res.status(500).json({ message: 'Internal server error' });
      });
  },
};

module.exports = { portfolioController };