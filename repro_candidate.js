
const { sequelize, User, Agency, Candidate, CandidatePayment, CandidatePaymentType, Account, Bank } = require('./src/models');
const CandidateService = require('./src/services/CandidateService');

async function test() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');
        // Ensure tables exist
        await sequelize.sync({ force: false }); // Do not force, use existing

        // 1. Create Agency if not exists
        let agency = await Agency.findOne();
        if (!agency) {
            agency = await Agency.create({ name: 'Test Agency', email: 'test@agency.com', phone: '123' });
        }
        console.log('Agency:', agency.id);

        // 2. Create User if not exists
        let user = await User.findOne({ where: { email: 'tester@example.com' } });
        if (!user) {
            user = await User.create({
                name: 'Tester',
                email: 'tester@example.com',
                password: 'hashedpassword',
                role: 'ADMIN',
                agency_id: agency.id
            });
        }
        console.log('User:', user.id);

        // 3. Create Candidate
        // We need to bypass the service for creation to ensure we have a candidate OR use the service.
        // Let's use the service to test duplicate code logic too.
        /*
        const candidateData = {
            name: "John Doe",
            agency_id: agency.id,
            email: "john@example.com",
            phone: "555-0100"
        };
        // Mock req.user
        // But services don't take req.user, just data.
        // createCandidate(data) where data includes agency_id and created_by
        
        // Let's insert directly to avoid service complexity first, OR use service.
        // Let's try service.
        */

        // Clean up any existing candidate with this email to avoid unique error?
        // Candidate model: candidate_code is unique.

        let candidate = await Candidate.findOne({ where: { name: 'John Doe' } });
        if (!candidate) {
            candidate = await CandidateService.createCandidate({
                name: 'John Doe',
                agency_id: agency.id,
                created_by: user.id,
                email: 'john@example.com'
            });
        }
        console.log('Candidate:', candidate.id);


        // 3b. Create Account and Payment Type if needed
        let account = await Account.findOne();
        if (!account) {
            account = await Account.create({
                agency_id: agency.id,
                name: 'Cash Box',
                type: 'CASH',
                currency: 'FBu',
                balance: 0
            });
        }

        let pType = await CandidatePaymentType.findOne({ where: { name: 'Registration' } });
        if (!pType) {
            pType = await CandidatePaymentType.create({ name: 'Registration', description: 'Fee' });
        }

        // 3c. Create Payment
        await CandidatePayment.create({
            agency_id: agency.id,
            candidate_id: candidate.id,
            payment_type_id: pType.id,
            amount: 5000,
            payment_date: new Date(),
            account_id: account.id,
            created_by: user.id
        });
        console.log('Payment created.');

        // 4. Fetch Candidate
        console.log('Fetching candidate...' + candidate.id);
        const fetched = await CandidateService.getCandidateById(candidate.id);
        console.log('Fetched Candidate Code:', fetched.candidate_code);
        console.log('Fetced includes works!');
        // 5. Update Candidate
        console.log('Updating candidate status...');
        const updated = await CandidateService.updateCandidate(candidate.id, { status: 'DEPLOYED' });
        console.log('Updated Status:', updated.status);

    } catch (error) {
        console.error('ERROR:', error);
    } finally {
        await sequelize.close();
    }
}

test();
