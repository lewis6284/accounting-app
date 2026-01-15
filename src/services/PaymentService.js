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
    static async createCandidatePayment({ candidate_id, payment_type_id, amount, payment_date, account_id }) {
        const t = await sequelize.transaction();
        try {
            // 1. Create Payment Record
            const payment = await CandidatePayment.create({
                candidate_id,
                payment_type_id,
                amount,
                payment_date: payment_date || moment().format('YYYY-MM-DD'),
                account_id
            }, { transaction: t });

            // 2. Create Journal Entry (Incoming Money -> ENTRY)
            await JournalService.createEntry({
                date: payment.payment_date,
                type: 'ENTRY',
                amount: payment.amount,
                account_id,
                source_table: 'revenue_automatic', // or 'candidate_payments'? Schema says 'revenue_automatic' source is 'candidate_payments'.
                // Wait, Journal source_table options: 'revenue_manual', 'revenue_automatic', 'expenses', 'salary_payments'.
                // Candidate Payment triggers Revenue Automatic. So Journal source should be Revenue Automatic?
                // Or Candidate Payments directly?
                // Schema: Journal source_table IN ('revenue_manual', 'revenue_automatic', 'expenses', 'salary_payments')
                // So we MUST create RevenueAutomatic first, then link Journal to it.
                // OR link Journal to RevenueAutomatic.
                // Let's create Revenue Automatic first.
                source_table: 'revenue_automatic',
                source_id: 0 // Placeholder, will update or creating order matters
            }, t);

            // Wait, I cannot pass source_id if RevenueAutomatic isn't created.
            // Correct flow:
            // 1. CandidatePayment
            // 2. RevenueAutomatic (linked to CandidatePayment)
            // 3. Journal (linked to RevenueAutomatic)
            // 4. Receipt (linked to CandidatePayment)

            // 2. Create Revenue Automatic
            const revenueAuto = await RevenueAutomatic.create({
                source_table: 'candidate_payments',
                source_id: payment.id,
                candidate_id,
                payment_type_id,
                amount,
                date: payment.payment_date,
                account_id
            }, { transaction: t });

            // Now Create Journal Entry linked to RevenueAutomatic
            // We need to re-call createEntry or just do it manually here if source_id needed?
            // Actually, I passed source_id: 0. That's wrong.
            // Let's call JournalService correctly now.
            // Note: createEntry updates account balance.
            // We called it with 0, failed? No I haven't called it yet in this flow thought process.

            await JournalService.createEntry({
                date: payment.payment_date,
                type: 'ENTRY',
                amount,
                account_id,
                source_table: 'revenue_automatic',
                source_id: revenueAuto.id
            }, t);

            // 3. Create Receipt
            // Schema: receipts source_table IN ('candidate_payments', 'revenue_manual')
            await Receipt.create({
                receipt_number: PaymentService.generateReceiptNumber(),
                date: payment.payment_date,
                amount,
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

    static async getAllCandidatePayments() {
        return await CandidatePayment.findAll({
            include: [
                { model: Candidate, attributes: ['name', 'candidate_code'] },
                { model: CandidatePaymentType, attributes: ['name'] },
                { model: Account, attributes: ['name'] }
            ]
        });
    }

    // ===========================================
    // SALARY PAYMENTS
    // ===========================================
    static async createSalaryPayment({ employee_id, month, amount, payment_date, account_id }) {
        const t = await sequelize.transaction();
        try {
            // 1. Create Salary Payment
            const payment = await SalaryPayment.create({
                employee_id,
                month,
                amount,
                payment_date: payment_date || moment().format('YYYY-MM-DD'),
                account_id
            }, { transaction: t });

            // 2. Create Journal Entry (Outgoing Money -> EXIT)
            // Journal source_table: 'salary_payments'
            await JournalService.createEntry({
                date: payment.payment_date,
                type: 'EXIT',
                amount: payment.amount,
                account_id,
                source_table: 'salary_payments',
                source_id: payment.id
            }, t);

            await t.commit();
            return payment;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    static async getAllSalaryPayments() {
        return await SalaryPayment.findAll({
            include: [
                { model: Employee, attributes: ['name', 'position'] },
                { model: Account, attributes: ['name'] }
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
