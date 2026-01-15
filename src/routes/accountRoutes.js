const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/AccountController');

router.get('/', AccountController.getAllAccounts);
router.post('/', AccountController.createAccount);

module.exports = router;
