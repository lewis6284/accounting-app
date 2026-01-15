const { sequelize } = require('./src/models');

async function verifySync() {
    try {
        await sequelize.query('PRAGMA foreign_keys = OFF;');
        await sequelize.sync({ force: true });
        await sequelize.query('PRAGMA foreign_keys = ON;');
        console.log('Database synced successfully with new schema!');
        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
        process.exit(1);
    }
}

verifySync();
