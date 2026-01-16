const {
    RevenueManual,
    RevenueAutomatic,
    RevenueType,
    Account,
    Receipt,
    User,
    sequelize
} = require('../models');
const JournalService = require('./JournalService');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

class RevenueService {
    // ===========================================
    // MANUAL REVENUE
    // ===========================================
    static async createManualRevenue({ agency_id, revenue_type_id, revenue_name, amount, date, account_id, description, created_by }) {
        const t = await sequelize.transaction();
        try {
            // 0. Get Account for currency
            const account = await Account.findByPk(account_id, { transaction: t });
            if (!account) throw new Error('Account not found');

            // 1. Create Revenue Manual
            const revenue = await RevenueManual.create({
                agency_id,
                revenue_type_id,
                revenue_name,
                amount,
                date: date || moment().format('YYYY-MM-DD'),
                account_id,
                description,
                created_by
            }, { transaction: t });

            // 2. Journal Entry (REVENUE - Positive amount)
            await JournalService.recordTransaction({
                agency_id,
                account_id,
                created_by,
                transaction_type: 'REVENUE',
                source_table: 'revenue_manual',
                source_id: revenue.id,
                currency: account.currency,
                amount: Math.abs(amount)
            }, t);

            // 3. Receipt
            // Assumption: Payer is a generic Customer for manual revenue
            await Receipt.create({
                receipt_number: RevenueService.generateReceiptNumber(),
                date: revenue.date,
                amount: revenue.amount,
                account_id,
                payer_type: 'CUSTOMER', // Defaulting to CUSTOMER
                payer_id: null, // No specific ID link for manual string names
                source_table: 'revenue_manual',
                source_id: revenue.id
            }, { transaction: t });

            await t.commit();
            return revenue;

        } catch (error) {
            await t.rollback();
            throw error;
        }
    }

    static async getAllManualRevenues(agency_id) {
        const whereClause = agency_id ? { agency_id } : {};
        return await RevenueManual.findAll({
            where: whereClause,
            include: [
                { model: RevenueType, attributes: ['name'] },
                { model: Account, attributes: ['name', 'currency'] },
                { model: User, attributes: ['name'] }
            ]
        });
    }

    // ===========================================
    // AUTOMATIC REVENUE
    // ===========================================
    static async getAllAutomaticRevenues() {
        return await RevenueAutomatic.findAll({
            include: [
                { model: Account, attributes: ['name'] }
                // Include Candidate etc via associations if needed
            ]
        });
    }

    // Helper
    static generateReceiptNumber() {
        const timestamp = moment().format('YYYYMMDDHHmmss');
        return `RC-${timestamp}-${uuidv4().slice(0, 6)}`;
    }
}

module.exports = RevenueService;
