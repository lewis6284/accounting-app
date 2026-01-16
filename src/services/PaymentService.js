const {
    CandidatePayment,
    SalaryPayment,
    Candidate,
    Employee,
    CandidatePaymentType,
    Account,
    Receipt,
    RevenueAutomatic,
    sequelize,
    User
} = require('../models');
const JournalService = require('./JournalService');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');

class PaymentService {
    // ===========================================
    // CANDIDATE PAYMENTS
    // ===========================================
    static async createCandidatePayment({ agency_id, created_by, candidate_id, payment_type_id, amount, payment_date, account_id }) {
        const t = await sequelize.transaction();
        try {
            // 0. Get Account for currency validation
            const account = await Account.findByPk(account_id, { transaction: t });
            if (!account) throw new Error('Account not found');

            // 1. Create Payment Record
            const payment = await CandidatePayment.create({
                agency_id,
                created_by,
                candidate_id,
                payment_type_id,
                amount,
                payment_date: payment_date || moment().format('YYYY-MM-DD'),
                account_id
            }, { transaction: t });

            // 2. Create Revenue Automatic
            const revenueAuto = await RevenueAutomatic.create({
                agency_id,
                source_table: 'candidate_payments',
                source_id: payment.id,
                candidate_id,
                payment_type_id,
                amount,
                date: payment.payment_date,
                account_id
            }, { transaction: t });

            // 3. Journal Entry (REVENUE - Positive amount)
            await JournalService.recordTransaction({
                agency_id,
                account_id,
                created_by,
                transaction_type: 'REVENUE',
                source_table: 'revenue_automatic',
                source_id: revenueAuto.id,
                currency: account.currency,
                amount: Math.abs(amount)
            }, t);

            // 4. Create Receipt
            await Receipt.create({
                agency_id,
                receipt_number: PaymentService.generateReceiptNumber(),
                date: payment.payment_date,
                amount,
                currency: account.currency,
                account_id,
                payer_type: 'CANDIDATE',
                payer_id: candidate_id,
                source_table: 'candidate_payments',
                source_id: payment.id
            }, { transaction: t });

            await t.commit();
            return { payment, revenueAuto };

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    static async getAllCandidatePayments(agency_id) {
        const whereClause = agency_id ? { agency_id } : {};
        return await CandidatePayment.findAll({
            where: whereClause,
            include: [
                { model: Candidate, attributes: ['name', 'candidate_code'] },
                { model: CandidatePaymentType, attributes: ['name'] },
                { model: Account, attributes: ['name', 'currency'] }
            ]
        });
    }

    // ===========================================
    // SALARY PAYMENTS
    // ===========================================
    static async createSalaryPayment({ agency_id, created_by, employee_id, month, amount, payment_date, account_id }) {
        const t = await sequelize.transaction();
        try {
            // 0. Get Account for currency validation
            const account = await Account.findByPk(account_id, { transaction: t });
            if (!account) throw new Error('Account not found');

            // 1. Create Salary Payment
            const payment = await SalaryPayment.create({
                agency_id,
                created_by,
                employee_id,
                month,
                amount,
                payment_date: payment_date || moment().format('YYYY-MM-DD'),
                account_id
            }, { transaction: t });

            // 2. Journal Entry (SALARY_PAYMENT - Negative amount)
            await JournalService.recordTransaction({
                agency_id,
                account_id,
                created_by,
                transaction_type: 'SALARY_PAYMENT',
                source_table: 'salary_payments',
                source_id: payment.id,
                currency: account.currency,
                amount: -Math.abs(amount)
            }, t);

            await t.commit();
            return payment;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    static async getAllSalaryPayments(agency_id) {
        const whereClause = agency_id ? { agency_id } : {};
        return await SalaryPayment.findAll({
            where: whereClause,
            include: [
                { model: Employee, attributes: ['name', 'job_function'] },
                { model: Account, attributes: ['name', 'currency'] }
            ]
        });
    }

    // Helper
    static generateReceiptNumber() {
        const timestamp = moment().format('YYYYMMDDHHmmss');
        return `RC-${timestamp}-${uuidv4().slice(0, 6)}`;
    }
}

module.exports = PaymentService;
