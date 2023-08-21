const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const {portfolioController} = require('../controllers/portfolioController');
// const { removeOldImageMiddleware } = require('../utils/multerConstant');

router.get('/', homeController.homePage);
router.get('/portfolio', portfolioController.index);
router.post('/portfolio/update-status', portfolioController.portfolioUpdateStatus);
router.post('/portfolio/create', portfolioController.create);
router.get('/portfolio/:id', portfolioController.getPortfolioById);
// router.put('/portfolio/:id/update', portfolioController.updatePortfolio);
router.delete('/portfolio/delete/:id', portfolioController.portfolioDeleteByAjax);
module.exports = router;
