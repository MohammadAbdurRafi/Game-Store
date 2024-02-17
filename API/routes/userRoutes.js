const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(userController.getUsers));
router.post('/register', asyncHandler(userController.register));
router.post('/login', asyncHandler(userController.login));
router.delete('/:user_id', asyncHandler(userController.deleteUser));

module.exports = router;
