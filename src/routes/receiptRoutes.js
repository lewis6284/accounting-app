const express = require('express');
const router = express.Router();
const ReceiptController = require('../controllers/ReceiptController');

router.get('/', ReceiptController.getAllReceipts);

module.exports = router;
