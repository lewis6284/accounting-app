const { sequelize, Supplier, Expense, Account, ExpenseCategory } = require('./src/models');
const SupplierService = require('./src/services/SupplierService');

async function testSupplierBackend() {
    try {
        console.log('Syncing models...');
        await Account.sync();
        await ExpenseCategory.sync();
        await Supplier.sync({ alter: true });
        await Expense.sync({ alter: true });

        // Setup prerequisites
        const [account] = await Account.findOrCreate({ where: { name: 'Test Account' }, defaults: { type: 'BANK', balance: 1000 } });
        const [category] = await ExpenseCategory.findOrCreate({ where: { name: 'Test Category' }, defaults: { type: 'Operational' } });

        console.log('Creating supplier...');
        const supplier = await SupplierService.createSupplier({
            name: 'Verification Supplier',
            email: 'supplier@test.com',
            phone: '123456789'
        });
        console.log('Created Supplier:', supplier.toJSON());

        console.log('Creating linked expense...');
        const expense = await Expense.create({
            date: '2024-03-01',
            amount: 100,
            category_id: category.id,
            account_id: account.id,
            beneficiary_type: 'SUPPLIER',
            beneficiary_id: supplier.id,
            description: 'Test Expense'
        });
        console.log('Created Expense:', expense.toJSON());

        console.log('Attempting to delete supplier (should fail)...');
        try {
            await SupplierService.deleteSupplier(supplier.id);
            throw new Error('FAILED: Supplier deletion should have failed due to linked expense.');
        } catch (err) {
            if (err.message === 'Cannot delete supplier with linked expenses') {
                console.log('SUCCESS: Supplier deletion failed as expected.');
            } else {
                throw err;
            }
        }

        console.log('Deleting expense...');
        await expense.destroy();

        console.log('Attempting to delete supplier (should succeed)...');
        await SupplierService.deleteSupplier(supplier.id);

        const deletedSupplier = await SupplierService.getSupplierById(supplier.id);
        if (!deletedSupplier) {
            console.log('SUCCESS: Supplier deleted successfully.');
        } else {
            throw new Error('FAILED: Supplier still exists.');
        }

    } catch (err) {
        console.error('FAILURE:', err);
    } finally {
        await sequelize.close();
    }
}

testSupplierBackend();
