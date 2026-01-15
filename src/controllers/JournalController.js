const JournalService = require('../services/JournalService');

exports.getAllJournals = async (req, res) => {
    try {
        const journals = await JournalService.getJournals();
        res.json(journals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
