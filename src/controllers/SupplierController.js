const SupplierService = require('../services/SupplierService');

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await SupplierService.getAllSuppliers();
        res.json(suppliers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createSupplier = async (req, res) => {
    try {
        const supplier = await SupplierService.createSupplier(req.body);
        res.status(201).json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await SupplierService.updateSupplier(req.params.id, req.body);
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        await SupplierService.deleteSupplier(req.params.id);
        res.json({ message: 'Supplier deleted successfully' });
    } catch (err) {
        if (err.message === 'Cannot delete supplier with linked expenses') {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
    }
};
