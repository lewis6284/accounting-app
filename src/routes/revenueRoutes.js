const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/RevenueController');

router.post('/manual', RevenueController.createManualRevenue);
router.get('/manual', RevenueController.getAllManualRevenues);

router.get('/automatic', RevenueController.getAllAutomaticRevenues);

module.exports = router;
