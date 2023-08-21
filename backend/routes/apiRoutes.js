const express = require('express');
const router = express.Router();
const { uploadFeaturedImage } = require('../utils/multerConstant');
const {
    portfolioCreate,
    fetchDataPortfolio,
    portfolioUpdate,
    updatePortfolioField,
    portfolioDelete
} = require('../controllers/api/portfolioController');
const {
    createUser,
    getUsers,
    updateUser
} = require('../controllers/usersApiController');

// Portfolio All Routes 

router.get('/portfolio', fetchDataPortfolio);
router.post('/portfolio/create', uploadFeaturedImage, portfolioCreate);
router.put('/portfolio/update/:id', uploadFeaturedImage, portfolioUpdate);
router.patch('/portfolio/:id', uploadFeaturedImage, updatePortfolioField);
router.delete('/portfolio/delete/:id', portfolioDelete);

// Users All Routes 
router.get('/users', getUsers);
router.post('/users/create', createUser);
router.put('/users/:id', updateUser);
module.exports = router;
