const express = require('express');
const router = express.Router();
const BankController = require('../controllers/BankController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, BankController.getAllBanks);
router.get('/:id', checkAuth, BankController.getBankById);
router.post('/', checkAuth, BankController.createBank);
router.put('/:id', checkAuth, BankController.updateBank);
router.delete('/:id', checkAuth, BankController.deleteBank);

module.exports = router;
