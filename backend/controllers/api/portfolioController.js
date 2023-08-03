const Portfolio = require("../../models/portfolio");

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

  Portfolio.findByIdAndUpdate(portfolioID, updateData, { new: true })
    .then((updatedPortfolio) => {
      if (!updatedPortfolio) {
        return res.status(404).json({ error: 'Portfolio Not Found' });
      }
      res.json(updatedPortfolio);
    })
    .catch((error) => {
      console.error('Failed Error Updating Portfolio', error);
      res.status(500).json({ error: 'Error updating the portfolio.' });
    });
};

module.exports = {
  portfolioCreate,
  fetchDataPortfolio,
  portfolioUpdate
};