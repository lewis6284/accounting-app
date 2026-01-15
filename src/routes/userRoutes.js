const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/', checkAuth, UserController.getAllUsers);

module.exports = router;
