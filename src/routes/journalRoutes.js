const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/JournalController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, JournalController.getAllJournals);

module.exports = router;
