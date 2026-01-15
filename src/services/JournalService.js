const { Journal, Account, sequelize } = require('../models');

class JournalService {
    /**
     * Records a journal entry and updates account balance.
     * @param {Object} params
     * @param {string} params.date - Date of transaction
     * @param {string} params.type - 'ENTRY' or 'EXIT'
     * @param {number} params.amount - Amount
     * @param {number} params.account_id - Account ID
     * @param {string} params.source_table - Source table name
     * @param {number} params.source_id - Source record ID
     * @param {Object} [t] - Sequelize transaction
     */
    static async createEntry({ date, type, amount, account_id, source_table, source_id }, t) {
        const transaction = t; // Expect transaction to be passed for atomicity

        // 1. Get Account
        const account = await Account.findByPk(account_id, { transaction });
        if (!account) {
            throw new Error('Account not found');
        }

        // 2. Calculate New Balance
        let newBalance = Number(account.balance);
        if (type === 'ENTRY') {
            newBalance += Number(amount);
        } else if (type === 'EXIT') {
            newBalance -= Number(amount);
        } else {
            throw new Error('Invalid Journal Type');
        }

        if (newBalance < 0) {
            // Depending on business logic, maybe allow negative? Schema says CHECK balance >= 0
            throw new Error('Insufficient funds in account');
        }

        // 3. Update Account
        await account.update({ balance: newBalance }, { transaction });

        // 4. Create Journal Record
        const journal = await Journal.create({
            date,
            type,
            amount,
            account_id,
            source_table,
            source_id,
            balance_after: newBalance
        }, { transaction });

        return journal;
    }

    static async getJournals() {
        return await Journal.findAll({
            include: [{ model: Account, attributes: ['name', 'type'] }],
            order: [['date', 'DESC'], ['id', 'DESC']]
        });
    }
}

module.exports = JournalService;
