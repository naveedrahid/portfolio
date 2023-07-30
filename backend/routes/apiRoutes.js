const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/api/portfolioController');
const { uploadFeaturedImage } = require('../utils/multerConstant');
const { createUser, getUsers, updateUser } = require('../controllers/usersApiController');

router.post('/portfolio/create', uploadFeaturedImage, portfolioController.portfolioCreate);

// Users All Routes
router.get('/users', getUsers);
router.post('/users/create', createUser);
router.put('/users/:id', updateUser);
module.exports = router;
