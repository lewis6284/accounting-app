const PaymentService = require('../services/PaymentService');

exports.createCandidatePayment = async (req, res) => {
    try {
        const result = await PaymentService.createCandidatePayment({
            ...req.body,
            agency_id: req.user.agency_id,
            created_by: req.user.id
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Error processing candidate payment' });
    }
};

exports.getAllCandidatePayments = async (req, res) => {
    try {
        const payments = await PaymentService.getAllCandidatePayments(req.user.agency_id);
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching candidate payments' });
    }
};

exports.createSalaryPayment = async (req, res) => {
    try {
        const result = await PaymentService.createSalaryPayment({
            ...req.body,
            agency_id: req.user.agency_id,
            created_by: req.user.id
        });
        res.json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Error processing salary payment' });
    }
};

exports.getAllSalaryPayments = async (req, res) => {
    try {
        const payments = await PaymentService.getAllSalaryPayments(req.user.agency_id);
        res.json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching salary payments' });
    }
};

