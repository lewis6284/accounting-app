const express = require('express');
const router = express.Router();
const DataListController = require('../controllers/DataListController');

router.get('/expense-categories', DataListController.getExpenseCategories);
router.post('/expense-categories', DataListController.createExpenseCategory);
router.delete('/expense-categories/:id', DataListController.deleteExpenseCategory);

router.get('/candidate-payment-types', DataListController.getCandidatePaymentTypes);
router.post('/candidate-payment-types', DataListController.createCandidatePaymentType);
router.delete('/candidate-payment-types/:id', DataListController.deleteCandidatePaymentType);

router.get('/revenue-types', DataListController.getRevenueTypes);
router.post('/revenue-types', DataListController.createRevenueType);
router.delete('/revenue-types/:id', DataListController.deleteRevenueType);

module.exports = router;
