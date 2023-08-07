const express = require('express');
const { portfolioCreate, fetchDataPortfolio, portfolioUpdate, updatePortfolioField } = require('../controllers/api/portfolioController');
const router = express.Router();
const { uploadFeaturedImage } = require('../utils/multerConstant');
const { createUser, getUsers, updateUser } = require('../controllers/usersApiController');
    
router.get('/portfolio', fetchDataPortfolio);
router.post('/portfolio/create', uploadFeaturedImage, portfolioCreate);
router.put('/portfolio/update/:id', uploadFeaturedImage, portfolioUpdate);
router.patch('/portfolio/:id', uploadFeaturedImage, updatePortfolioField);

// Users All Routes 
router.get('/users', getUsers);
router.post('/users/create', createUser);
router.put('/users/:id', updateUser);
module.exports = router;
