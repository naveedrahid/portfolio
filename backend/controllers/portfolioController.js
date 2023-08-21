const Portfolio = require("../models/portfolio");
const { uploadFeaturedImage, removeImage, removeOldImage } = require("../utils/multerConstant");
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
      if (!add_title || !add_desc) {
        return res.status(400).json({ error: 'Title and description are required fields' });
      }
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
  portfolioDeleteByAjax: (req, res) => {
    const paramsId = req.params.id;
    Portfolio.findById(paramsId)
      .then((resultItem) => {
        if (!resultItem) {
          return res.status(404).json({ message: 'Portfolio item not found' });
        }
        const oldImageFilename = resultItem.featuredimage;
        removeOldImage(oldImageFilename);

        Portfolio.findByIdAndDelete(paramsId)
          .then((result) => {
            if (!result) {
              return res.status(404).json({ message: 'Record not found!' });
            }
            res.status(200).json({ status: 'success', oldImageFilename: oldImageFilename });
          }).catch((err) => {
            console.error('Error deleting portfolio item:', err);
            res.status(500).json({ message: 'An error occurred while deleting the portfolio item' });
          }).catch((err) => {
            console.error('Error finding portfolio item:', err);
            return res.status(500).json({ message: 'An error occurred while finding the portfolio item' });
          });
      })
  },
  getPortfolioById: async (req, res) => {
    try {
      const itemId = req.params.id;
      const portfolioItem = await Portfolio.findById(itemId);
      if (!portfolioItem) {
        return res.status(404).json({ message: 'Portfolio item not found' });
      }
      res.status(200).json(portfolioItem);
    } catch (err) {
      console.error('Error fetching portfolio item:', err);
      res.status(500).json({ message: 'Internal Server error' });
    }
  },
  // updatePortfolio: async (req, res) => {
  //   try {
  //     const itemId = req.params.id;
  //     const { edit_title, edit_desc, edit_status, old_image_filename } = req.body;

  //     let updatedData = {
  //       title: edit_title,
  //       description: edit_desc,
  //       status: edit_status === 'Active' ? true : false,
  //     };

  //     if (req.file) {
  //       // If a new image is uploaded, update the 'featuredimage' field
  //       updatedData.featuredimage = req.file.filename;

  //       // Remove the old image if it exists
  //       if (old_image_filename) {
  //         removeOldImage(old_image_filename);
  //       }
  //     }

  //     const updatedPortfolioItem = await Portfolio.findByIdAndUpdate(
  //       itemId,
  //       updatedData,
  //       { new: true }
  //     );

  //     if (!updatedPortfolioItem) {
  //       return res.status(404).json({ message: 'Portfolio item not found' });
  //     }

  //     res.status(200).json(updatedPortfolioItem);
  //   } catch (err) {
  //     console.error('Error updating portfolio item:', err);
  //     res.status(500).json({ message: 'Internal Server error' });
  //   }

  // },
};

module.exports = { portfolioController }; 