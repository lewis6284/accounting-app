const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/JournalController');

router.get('/', JournalController.getAllJournals);

module.exports = router;
