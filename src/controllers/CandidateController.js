const CandidateService = require('../services/CandidateService');

exports.createCandidate = async (req, res) => {
    try {
        const candidate = await CandidateService.createCandidate(req.body);
        res.status(201).json(candidate);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creating candidate' });
    }
};

exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await CandidateService.getAllCandidates();
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
        console.error(err);
        res.status(500).json({ error: 'Error fetching candidate' });
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
        res.json({ message: 'Candidate deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error deleting candidate' });
    }
};
