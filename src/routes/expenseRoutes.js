const express = require('express');
const router = express.Router();
const ExpenseController = require('../controllers/ExpenseController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/', checkAuth, ExpenseController.createExpense);
router.get('/', checkAuth, ExpenseController.getAllExpenses);
router.put('/:id', checkAuth, ExpenseController.updateExpense);
router.delete('/:id', checkAuth, ExpenseController.deleteExpense);

module.exports = router;
