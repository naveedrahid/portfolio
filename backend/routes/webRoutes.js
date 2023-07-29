const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const portfolioController = require('../controllers/portfolioController');

router.get('/', homeController.homePage);
router.get('/portfolio', portfolioController.portfolioView);

module.exports = router;
