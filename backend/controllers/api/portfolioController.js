const Portfolio = require("../../models/portfolio");

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
module.exports = {
  portfolioCreate,
};
