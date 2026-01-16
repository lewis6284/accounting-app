const express = require('express');
const router = express.Router();
const CandidateController = require('../controllers/CandidateController');
const checkAuth = require('../middleware/authMiddleware');

router.post('/', checkAuth, CandidateController.createCandidate);
router.get('/', checkAuth, CandidateController.getAllCandidates);
router.get('/:id', checkAuth, CandidateController.getCandidateById);
router.put('/:id', checkAuth, CandidateController.updateCandidate);
router.delete('/:id', checkAuth, CandidateController.deleteCandidate);

module.exports = router;
