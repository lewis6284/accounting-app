const { sequelize } = require('./src/models');

async function syncDB() {
    try {
        console.log('Starting database synchronization...');

        // Disable foreign keys for SQLite to allow table reconstruction
        await sequelize.query('PRAGMA foreign_keys = OFF;');

        await sequelize.sync({ force: true });

        // Re-enable foreign keys
        await sequelize.query('PRAGMA foreign_keys = ON;');

        console.log('Database synchronized successfully (force: true applied).');
        process.exit(0);
    } catch (error) {
        console.error('Failed to sync database:', error);
        process.exit(1);
    }
}

syncDB();
