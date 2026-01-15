const express = require('express');
const router = express.Router();
const CandidateController = require('../controllers/CandidateController');

router.post('/', CandidateController.createCandidate);
router.get('/', CandidateController.getAllCandidates);
router.get('/:id', CandidateController.getCandidateById);
router.put('/:id', CandidateController.updateCandidate);
router.delete('/:id', CandidateController.deleteCandidate);

module.exports = router;
