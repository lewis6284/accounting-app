const { sequelize } = require('./src/models');
const User = require('./src/models/User');
const Candidate = require('./src/models/Candidate');
const Payment = require('./src/models/Payment');

async function testSchema() {
    try {
        console.log('Testing schema relationships...');

        // 1. Create a User
        const user = await User.create({
            nom: 'Admin User',
            email: 'admin@example.com',
            mot_de_passe: 'secret',
            role: 'admin'
        });
        console.log('User created:', user.id);

        // 2. Create a Candidate
        const candidate = await Candidate.create({
            nom: 'John Doe',
            telephone: '123456789',
            formation: 'Comptabilité',
            created_by: user.id
        });
        console.log('Candidate created:', candidate.id);

        // 3. Create a Payment
        const payment = await Payment.create({
            candidat_id: candidate.id,
            date_paiement: '2025-01-09',
            montant: 500.00,
            mode: 'CASH',
            created_by: user.id
        });
        console.log('Payment created:', payment.id);

        console.log('Schema verification successful!');
    } catch (error) {
        console.error('Schema verification failed:', error);
    } finally {
        await sequelize.close();
    }
}

testSchema();
