const express = require('express');
const router = express.Router();
const PaymentController = require('../controllers/PaymentController');

router.post('/candidate', PaymentController.createCandidatePayment);
router.get('/candidate', PaymentController.getAllCandidatePayments);

router.post('/salary', PaymentController.createSalaryPayment);
router.get('/salary', PaymentController.getAllSalaryPayments);

module.exports = router;
