const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, AccountController.getAllAccounts);
router.post('/', checkAuth, AccountController.createAccount);

module.exports = router;
