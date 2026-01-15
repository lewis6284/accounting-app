const { ExpenseCategory, CandidatePaymentType, RevenueType } = require('../models');

exports.getExpenseCategories = async (req, res) => {
    try {
        const categories = await ExpenseCategory.findAll();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getCandidatePaymentTypes = async (req, res) => {
    try {
        const types = await CandidatePaymentType.findAll();
        res.json(types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getRevenueTypes = async (req, res) => {
    try {
        const types = await RevenueType.findAll();
        res.json(types);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create Methods
exports.createExpenseCategory = async (req, res) => {
    try {
        const category = await ExpenseCategory.create(req.body);
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createCandidatePaymentType = async (req, res) => {
    try {
        const type = await CandidatePaymentType.create(req.body);
        res.status(201).json(type);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createRevenueType = async (req, res) => {
    try {
        const type = await RevenueType.create(req.body);
        res.status(201).json(type);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Methods
exports.deleteExpenseCategory = async (req, res) => {
    try {
        await ExpenseCategory.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteCandidatePaymentType = async (req, res) => {
    try {
        await CandidatePaymentType.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Type deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteRevenueType = async (req, res) => {
    try {
        await RevenueType.destroy({ where: { id: req.params.id } });
        res.json({ message: 'Type deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
