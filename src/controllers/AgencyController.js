const { Agency } = require('../models');

exports.getAllAgencies = async (req, res) => {
    try {
        const agencies = await Agency.findAll();
        res.json(agencies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAgencyById = async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (!agency) return res.status(404).json({ message: 'Agency not found' });
        res.json(agency);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createAgency = async (req, res) => {
    try {
        const agency = await Agency.create(req.body);
        res.status(201).json(agency);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateAgency = async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (!agency) return res.status(404).json({ message: 'Agency not found' });
        await agency.update(req.body);
        res.json(agency);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteAgency = async (req, res) => {
    try {
        const agency = await Agency.findByPk(req.params.id);
        if (!agency) return res.status(404).json({ message: 'Agency not found' });
        await agency.destroy();
        res.json({ message: 'Agency deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
