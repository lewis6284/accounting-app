const {
    Agency,
    Bank,
    Account,
    Candidate,
    Employee,
    Supplier,
    CandidatePaymentType,
    RevenueType,
    User,
    sequelize
} = require('./src/models');
const CandidateService = require('./src/services/CandidateService');
const EmployeeService = require('./src/services/EmployeeService');
const PaymentService = require('./src/services/PaymentService');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

async function seed() {
    console.log('🌱 Starting Seeding...');

    try {
        // await sequelize.sync({ alter: true }); // Skipped, already synced

        // 1. Ensure Agency
        let agency = await Agency.findOne();
        if (!agency) {
            agency = await Agency.create({
                name: 'Main Agency',
                code: 'AG01',
                location: 'Bujumbura',
                currency: 'FBu'
            });
            console.log('✅ Agency created');
        }

        // 2. Ensure Bank
        let bank = await Bank.findOne();
        if (!bank) {
            bank = await Bank.create({
                name: 'Standard Bank',
                code: 'SB001',
                address: 'Downtown',
                country: 'Burundi'
            });
            console.log('✅ Bank created');
        }

        // 3. Ensure Users
        const hashedPassword = await bcrypt.hash('12345678', 10);

        // Admin
        let admin = await User.findOne({ where: { email: 'admin@test.com' } });
        if (!admin) {
            admin = await User.create({
                name: 'System Admin',
                email: 'admin@test.com',
                password: hashedPassword,
                role: 'ADMIN',
                agency_id: agency.id
            });
            console.log('✅ Admin User created');
        }

        // Lewis (Requested User)
        let lewis = await User.findOne({ where: { email: 'lewis@gmail.com' } });
        if (!lewis) {
            lewis = await User.create({
                name: 'Lewis',
                email: 'lewis@gmail.com',
                password: hashedPassword,
                role: 'ADMIN',
                agency_id: agency.id
            });
            console.log('✅ Lewis User created');
        }

        // 4. Ensure Supporting Types
        let payType = await CandidatePaymentType.findOne();
        if (!payType) {
            payType = await CandidatePaymentType.create({ name: 'Enrollment Fee' });
            console.log('✅ Candidate Payment Type created');
        }

        // 5. Create 5 Accounts (Finance)
        console.log('💰 Creating 5 Accounts...');
        const accounts = [];
        for (let i = 1; i <= 5; i++) {
            const acc = await Account.create({
                name: `Account ${i}`,
                type: i % 2 === 0 ? 'BANK' : 'CASH',
                balance: 10000000,
                currency: 'FBu',
                agency_id: agency.id,
                bank_id: i % 2 === 0 ? bank.id : null
            });
            accounts.push(acc);
        }

        // 6. Create 5 Suppliers
        console.log('🚚 Creating 5 Suppliers...');
        for (let i = 1; i <= 5; i++) {
            await Supplier.create({
                name: `Supplier ${i}`,
                phone: `+257 ${1000 + i}`,
                email: `supplier${i}@test.com`
            });
        }

        // 7. Create 5 Candidates
        console.log('🎓 Creating 5 Candidates...');
        const candidates = [];
        for (let i = 1; i <= 5; i++) {
            const cand = await CandidateService.createCandidate({
                name: `Candidate ${i}`,
                passport_number: `PASS${1000 + i}`,
                phone: `+257 ${2000 + i}`,
                status: 'PENDING',
                agency_id: agency.id,
                created_by: admin.id
            });
            candidates.push(cand);
        }

        // 8. Create 5 Employees
        console.log('👥 Creating 5 Employees...');
        const employees = [];
        for (let i = 1; i <= 5; i++) {
            const emp = await EmployeeService.createEmployee({
                name: `Employee ${i}`,
                job_function: i % 2 === 0 ? 'ACCOUNTANT' : 'MANAGER',
                monthly_salary: 500000 + (i * 100000),
                agency_id: agency.id,
                hire_date: '2025-01-01',
                status: 'ACTIVE'
            });
            employees.push(emp);
        }

        // 9. Create 5 Candidate Payments
        console.log('💳 Creating 5 Candidate Payments...');
        for (let i = 0; i < 5; i++) {
            await PaymentService.createCandidatePayment({
                agency_id: agency.id,
                created_by: admin.id,
                candidate_id: candidates[i].id,
                payment_type_id: payType.id,
                amount: 150000,
                payment_date: '2026-01-16',
                account_id: accounts[i].id
            });
        }

        // 10. Create 5 Salary Payments
        console.log('💵 Creating 5 Salary Payments...');
        for (let i = 0; i < 5; i++) {
            await PaymentService.createSalaryPayment({
                agency_id: agency.id,
                created_by: admin.id,
                employee_id: employees[i].id,
                month: 'January 2026',
                amount: employees[i].monthly_salary,
                payment_date: '2026-01-16',
                account_id: accounts[i].id
            });
        }

        console.log('✨ Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
}

seed();
