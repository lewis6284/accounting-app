const express = require('express');
const router = express.Router();
const AgencyController = require('../controllers/AgencyController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, AgencyController.getAllAgencies);
router.get('/:id', checkAuth, AgencyController.getAgencyById);
router.post('/', checkAuth, AgencyController.createAgency);
router.put('/:id', checkAuth, AgencyController.updateAgency);
router.delete('/:id', checkAuth, AgencyController.deleteAgency);

module.exports = router;
