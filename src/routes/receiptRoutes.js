const express = require('express');
const router = express.Router();
const ReceiptController = require('../controllers/ReceiptController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, ReceiptController.getAllReceipts);

module.exports = router;
