const RevenueService = require('../services/RevenueService');

exports.createManualRevenue = async (req, res) => {
    try {
        const revenue = await RevenueService.createManualRevenue(req.body);
        res.status(201).json(revenue);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating manual revenue' });
    }
};

exports.getAllManualRevenues = async (req, res) => {
    try {
        const revenues = await RevenueService.getAllManualRevenues();
        res.json(revenues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching manual revenues' });
    }
};

exports.getAllAutomaticRevenues = async (req, res) => {
    try {
        const revenues = await RevenueService.getAllAutomaticRevenues();
        res.json(revenues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching automatic revenues' });
    }
};

