const RevenueService = require('../services/RevenueService');

exports.createManualRevenue = async (req, res) => {
    try {
        const { agency_id, ...otherData } = req.body;
        const finalAgencyId = agency_id || req.user.agency_id;

        const revenue = await RevenueService.createManualRevenue({
            ...otherData,
            agency_id: finalAgencyId,
            created_by: req.user.id
        });
        res.status(201).json(revenue);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Error creating manual revenue' });
    }
};

exports.getAllManualRevenues = async (req, res) => {
    try {
        const revenues = await RevenueService.getAllManualRevenues(req.user.agency_id);
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

