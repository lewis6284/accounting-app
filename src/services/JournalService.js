const { Journal, Account, sequelize } = require('../models');

class JournalService {
    /**
     * Records a transaction in the journal and updates the account balance.
     * This is an atomic operation.
     * 
     * @param {Object} data - Transaction data
     * @param {number} data.agency_id - Agency ID
     * @param {number} data.account_id - Account ID
     * @param {number} data.created_by - User ID who created the entry
     * @param {string} data.transaction_type - e.g., 'REVENUE', 'EXPENSE', 'CANDIDATE_PAYMENT', 'SALARY_PAYMENT'
     * @param {string} data.source_table - Table name of the source transaction
     * @param {number} data.source_id - ID of the source transaction
     * @param {string} data.currency - Currency code
     * @param {number} data.amount - Amount (positive for income, negative for expense)
     * @param {Object} [t] - Sequelize transaction
     */
    static async recordTransaction(data, t) {
        const { agency_id, account_id, created_by, transaction_type, source_table, source_id, currency, amount } = data;

        const transaction = t;

        // 1. Get current account balance
        const account = await Account.findByPk(account_id, { transaction });
        if (!account) throw new Error('Account not found');
        if (account.agency_id !== agency_id) throw new Error('Account does not belong to this agency');
        if (account.currency !== currency) throw new Error(`Currency mismatch: account is ${account.currency}, transaction is ${currency}`);

        // 2. Calculate new balance
        const newBalance = parseFloat(account.balance) + parseFloat(amount);

        // 3. Prevent negative balance
        if (newBalance < 0) {
            throw new Error('Insufficient funds in account');
        }

        // 4. Create Journal Entry
        const journalEntry = await Journal.create({
            agency_id,
            account_id,
            created_by,
            transaction_type,
            source_table,
            source_id,
            currency,
            amount,
            balance_after: newBalance
        }, { transaction });

        // 5. Update Account Balance
        await account.update({ balance: newBalance }, { transaction });

        return journalEntry;
    }

    static async getJournals(agency_id) {
        const whereClause = agency_id ? { agency_id } : {};
        return await Journal.findAll({
            where: whereClause,
            include: [{ model: Account, attributes: ['name', 'type', 'currency'] }],
            order: [['created_at', 'DESC'], ['id', 'DESC']]
        });
    }
}

module.exports = JournalService;
