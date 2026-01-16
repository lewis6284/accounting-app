const { Account } = require('../models');

exports.getAllAccounts = async (req, res) => {
    try {
        const whereClause = req.user.role === 'ADMIN' ? {} : { agency_id: req.user.agency_id };
        const accounts = await Account.findAll({ where: whereClause });
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAccount = async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.bank_id === '') data.bank_id = null;

        const account = await Account.create({
            ...data,
            agency_id: data.agency_id || req.user.agency_id
        });
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
