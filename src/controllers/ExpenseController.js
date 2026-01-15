const ExpenseService = require('../services/ExpenseService');

exports.createExpense = async (req, res) => {
    try {
        const { date, amount, category_id, account_id, description, beneficiary_type, beneficiary_id } = req.body;

        if (!amount || !category_id || !account_id) {
            return res.status(400).json({ error: 'Missing required fields: amount, category_id, account_id are required.' });
        }

        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: 'Invalid amount: Must be a positive number.' });
        }

        const expense = await ExpenseService.createExpense({
            date,
            amount,
            category_id,
            account_id,
            description,
            beneficiary_type,
            beneficiary_id
        });
        res.status(201).json(expense);
    } catch (err) {
        console.error('Create Expense Error:', err);
        res.status(500).json({ error: err.message || 'Error creating expense' });
    }
};

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseService.getAllExpenses();
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching expenses' });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expense = await ExpenseService.updateExpense(req.params.id, req.body);
        if (!expense) return res.status(404).json({ error: 'Expense not found' });
        res.json(expense);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const result = await ExpenseService.deleteExpense(req.params.id);
        if (!result) return res.status(404).json({ error: 'Expense not found' });
        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting expense' });
    }
};

