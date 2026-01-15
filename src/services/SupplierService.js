const { Supplier, Expense } = require('../models');

exports.createSupplier = async (data) => {
    return await Supplier.create(data);
};

exports.getAllSuppliers = async () => {
    return await Supplier.findAll();
};

exports.getSupplierById = async (id) => {
    return await Supplier.findByPk(id);
};

exports.updateSupplier = async (id, data) => {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) throw new Error('Supplier not found');
    return await supplier.update(data);
};

exports.deleteSupplier = async (id) => {
    const supplier = await Supplier.findByPk(id);
    if (!supplier) throw new Error('Supplier not found');

    // Check for linked expenses
    const expenseCount = await Expense.count({
        where: {
            beneficiary_type: 'SUPPLIER',
            beneficiary_id: id
        }
    });

    if (expenseCount > 0) {
        throw new Error('Cannot delete supplier with linked expenses');
    }

    return await supplier.destroy();
};
