const express = require('express');
const router = express.Router();
const UserController = require('../controllers/homeController');

router.post('/users', UserController.createUser);
// router.post('/users', UserController.createUser);

// router.get('/users/:id', UserController.getUserById);
// router.put('/users/:id', UserController.updateUser);
// router.delete('/users/:id', UserController.deleteUser);

module.exports = router;
