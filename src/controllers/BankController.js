const { Bank } = require('../models');

exports.getAllBanks = async (req, res) => {
    try {
        const banks = await Bank.findAll();
        res.json(banks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBankById = async (req, res) => {
    try {
        const bank = await Bank.findByPk(req.params.id);
        if (!bank) return res.status(404).json({ message: 'Bank not found' });
        res.json(bank);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createBank = async (req, res) => {
    try {
        const bank = await Bank.create(req.body);
        res.status(201).json(bank);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateBank = async (req, res) => {
    try {
        const bank = await Bank.findByPk(req.params.id);
        if (!bank) return res.status(404).json({ message: 'Bank not found' });
        await bank.update(req.body);
        res.json(bank);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteBank = async (req, res) => {
    try {
        const bank = await Bank.findByPk(req.params.id);
        if (!bank) return res.status(404).json({ message: 'Bank not found' });
        await bank.destroy();
        res.json({ message: 'Bank deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
