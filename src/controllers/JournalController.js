const JournalService = require('../services/JournalService');

exports.getAllJournals = async (req, res) => {
    try {
        const agency_id = req.user.role === 'ADMIN' ? null : req.user.agency_id;
        const journals = await JournalService.getJournals(agency_id);
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
