const Portfolio = require("../../models/portfolio");
const { removeOldImage } = require("../../utils/multerConstant");
const path = require('path');
const fs = require('fs');
const basePath = path.join(__dirname, '..', '..', 'public', 'uploads');

const fetchDataPortfolio = (req, res) => {
  Portfolio.find()
    .then((result) => {
      res.json(result);
    }).catch((error) => {
      console.log('Error Fetching Portfolio');
      res.status(500).json({ error: "Error fetching portfolio" });
    });
}

const portfolioCreate = async (req, res) => {
  const { title, description, status } = req.body;
  const featuredimage = req.file ? req.file.filename : undefined;
  const portfolio = new Portfolio({
    title,
    description,
    status,
    featuredimage,
  });

  portfolio
    .save()
    .then(() => {
      res.status(201).json({ message: 'Portfolio created successfully' });
    })
    .catch((error) => {
      console.log('Error creating portfolio:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
}
const portfolioUpdate = (req, res) => {
  const portfolioID = req.params.id;
  const { title, description, status } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const updateData = { title, description, status };
  if (req.file) {
    updateData.featuredimage = req.file.filename;
  }

  Portfolio.findById(portfolioID)
    .then((oldPortfolio) => {
      if (!oldPortfolio) {
        return res.status(404).json({ error: 'Portfolio Not Found' });
      }
      const oldImageFilename = oldPortfolio.featuredimage;
      Portfolio.findByIdAndUpdate(portfolioID, updateData, { new: true })
        .then((updatedPortfolio) => {
          if (!updatedPortfolio) {
            return res.status(404).json({ error: 'Portfolio Not Found' });
          }

          if (oldImageFilename && oldImageFilename !== updateData.featuredimage) {
            removeOldImage(oldImageFilename);
          }

          res.json(updatedPortfolio);
        })
        .catch((error) => {
          console.error('Failed Error Updating Portfolio', error);
          res.status(500).json({ error: 'Error updating the portfolio.' });
        });
    })
    .catch((error) => {
      console.error('Failed to find Portfolio', error);
      res.status(500).json({ error: 'Error finding the portfolio.' });
    });
};
const updatePortfolioField = async (req, res) => {
  const portfolioID = req.params.id;
  const { title, description, status } = req.body;

  if (!title && !description && !status && !req.file) {
    return res.status(400).json({ error: 'At least one field is required for updating!' });
  }

  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (status) updateData.status = status;
  if (req.file) updateData.featuredimage = req.file.filename;

  try {
    const oldPortfolio = await Portfolio.findById(portfolioID);
    if (!oldPortfolio) {
      return res.status(404).json({ error: 'Portfolio Not Found' });
    }

    const oldImageFilename = oldPortfolio.featuredimage;
    const updatedPortfolio = await Portfolio.findByIdAndUpdate(portfolioID, updateData, { new: true });

    if (!updatedPortfolio) {
      return res.status(404).json({ error: 'Portfolio Not Found' });
    }

    if (oldImageFilename && oldImageFilename !== updateData.featuredimage) {
      const imagePath = path.join(basePath, oldImageFilename);
      fs.unlink(imagePath, (error) => {
        if (error) {
          console.error('Failed to remove old image:', error);
        } else {
          console.log('Old image removed successfully.');
        }
      });
    }

    res.json(updatedPortfolio);
  } catch (error) {
    console.error('Failed Error Updating Portfolio', error);
    res.status(500).json({ error: 'Error updating the portfolio.' });
  }
};

module.exports = {
  portfolioCreate,
  fetchDataPortfolio,
  portfolioUpdate,
  updatePortfolioField
};