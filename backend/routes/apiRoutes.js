const express = require('express');
const router = express.Router();
const userApiController = require('../controllers/usersApiController');

router.get('/users', userApiController.getUsers);
router.post('/users/create', userApiController.createUser);
router.put('/users/:id', userApiController.updateUser);

// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
