const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/candidate', checkAuth, PaymentController.createCandidatePayment);
router.get('/candidate', checkAuth, PaymentController.getAllCandidatePayments);

router.post('/salary', checkAuth, PaymentController.createSalaryPayment);
router.get('/salary', checkAuth, PaymentController.getAllSalaryPayments);

module.exports = router;
