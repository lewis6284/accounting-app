const express = require('express');
const router = express.Router();
const RevenueController = require('../controllers/RevenueController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/manual', checkAuth, RevenueController.createManualRevenue);
router.get('/manual', checkAuth, RevenueController.getAllManualRevenues);

router.get('/automatic', checkAuth, RevenueController.getAllAutomaticRevenues);

module.exports = router;
