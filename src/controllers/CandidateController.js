const CandidateService = require('../services/CandidateService');

exports.createCandidate = async (req, res) => {
    try {
        const { agency_id, ...otherData } = req.body;

        // Ensure user is authenticated
        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Priority: Provided agency_id -> User's agency_id
        const finalAgencyId = agency_id ? parseInt(agency_id, 10) : req.user.agency_id;

        if (!finalAgencyId) {
            return res.status(400).json({ error: 'Agency ID is required' });
        }

        const candidate = await CandidateService.createCandidate({
            ...otherData,
            agency_id: finalAgencyId,
            created_by: req.user.id
        });
        res.status(201).json(candidate);
    } catch (err) {
        console.error("Error in createCandidate controller:", err);
        res.status(500).json({ error: err.message || 'Error creating candidate' });
    }
};

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await CandidateService.getAllCandidates(req.user.agency_id);
        res.json(candidates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error fetching candidates' });
    }
};

exports.getCandidateById = async (req, res) => {
    try {
        const candidate = await CandidateService.getCandidateById(req.params.id);
        if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
        res.json(candidate);
    } catch (err) {
        console.error("Error in getCandidateById:", err);

        res.status(500).json({ error: err.message || 'Error fetching candidate' });
    }
};


exports.updateCandidate = async (req, res) => {
    try {
        const candidate = await CandidateService.updateCandidate(req.params.id, req.body);
        if (!candidate) return res.status(404).json({ error: 'Candidate not found' });
        res.json(candidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error updating candidate' });
    }
};

exports.deleteCandidate = async (req, res) => {
    try {
        const result = await CandidateService.deleteCandidate(req.params.id);
        if (!result) return res.status(404).json({ error: 'Candidate not found' });
        res.json({ message: 'Candidate archived/cancelled successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting candidate' });
    }
};
