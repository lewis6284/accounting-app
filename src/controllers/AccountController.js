const { Account } = require('../models');

exports.getAllAccounts = async (req, res) => {
    try {
        const accounts = await Account.findAll();
        res.json(accounts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAccount = async (req, res) => {
    try {
        const account = await Account.create(req.body);
        res.status(201).json(account);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
