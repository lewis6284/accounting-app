const { sequelize } = require('./models');

async function migrate() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const queryInterface = sequelize.getQueryInterface();

        try {
            await queryInterface.addColumn('Expenses', 'createdById', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true
            });
            console.log('Added createdById to Expenses');
        } catch (e) {
            console.log('createdById might already exist in Expenses', e.message);
        }

        try {
            await queryInterface.addColumn('Receipts', 'paymentId', {
                type: sequelize.Sequelize.INTEGER,
                allowNull: true
            });
            console.log('Added paymentId to Receipts');
        } catch (e) {
            console.log('paymentId might already exist in Receipts', e.message);
        }

        // Also check Journal type enum? SQLite doesn't strictly enforce unless check constraint.
        // We updated the model, so new inserts are fine. Old data is fine.

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await sequelize.close();
    }
}

migrate();
