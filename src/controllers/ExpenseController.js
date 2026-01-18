const ExpenseService = require('../services/ExpenseService');

exports.createExpense = async (req, res) => {
    try {
        const { agency_id, date, amount, category_id, account_id, description, beneficiary_type, beneficiary_id } = req.body;

        if (!amount || !category_id || !account_id) {
            return res.status(400).json({ error: 'Missing required fields: amount, category_id, account_id are required.' });
        }

        if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: 'Invalid amount: Must be a positive number.' });
        }

        const finalAgencyId = agency_id || req.user.agency_id;

        const expense = await ExpenseService.createExpense({
            agency_id: finalAgencyId,
            created_by: req.user.id,
            date,
            amount,
            category_id,
            account_id,
            description,
            beneficiary_type,
            beneficiary_id: beneficiary_id === '' ? null : beneficiary_id
        });
        res.status(201).json(expense);

    } catch (err) {
        console.error('Create Expense Error:', err);
        res.status(500).json({ error: err.message || 'Error creating expense' });
    }
};

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await ExpenseService.getAllExpenses(req.user.agency_id);
        res.json(expenses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching expenses' });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        // Business Rule: Financial records are immutable. 
        // Only non-financial fields could be updated, but for simplicity, we block updates that affect totals.
        return res.status(403).json({ error: 'Financial records are immutable. Updates are restricted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating expense' });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        return res.status(403).json({ error: 'Financial records are immutable and cannot be deleted.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting expense' });
    }
};

