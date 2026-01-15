const PaymentService = require('../services/PaymentService');

exports.createCandidatePayment = async (req, res) => {
    try {
        const result = await PaymentService.createCandidatePayment(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error processing candidate payment' });
    }
};

exports.getAllCandidatePayments = async (req, res) => {
    try {
        const payments = await PaymentService.getAllCandidatePayments();
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching candidate payments' });
    }
};

exports.createSalaryPayment = async (req, res) => {
    try {
        const result = await PaymentService.createSalaryPayment(req.body);
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error processing salary payment' });
    }
};

exports.getAllSalaryPayments = async (req, res) => {
    try {
        const payments = await PaymentService.getAllSalaryPayments();
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching salary payments' });
    }
};

