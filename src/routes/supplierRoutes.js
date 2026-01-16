const express = require('express');
const router = express.Router();
const SupplierController = require('../controllers/SupplierController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, SupplierController.getAllSuppliers);
router.post('/', checkAuth, SupplierController.createSupplier);
router.put('/:id', checkAuth, SupplierController.updateSupplier);
router.delete('/:id', checkAuth, SupplierController.deleteSupplier);

module.exports = router;
