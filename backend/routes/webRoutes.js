const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const {portfolioView, portfolioUpdateStatus} = require('../controllers/portfolioController');

router.get('/', homeController.homePage);
router.get('/portfolio', portfolioView);
router.post('/portfolio/update-status', portfolioUpdateStatus);

module.exports = router;
