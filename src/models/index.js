const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database.sqlite')
});

// Import models
const User = require('./User')(sequelize, DataTypes);
const Employee = require('./Employee')(sequelize, DataTypes);
const Account = require('./Account')(sequelize, DataTypes);
const Supplier = require('./Supplier')(sequelize, DataTypes);
const ExpenseCategory = require('./ExpenseCategory')(sequelize, DataTypes);
const Candidate = require('./Candidate')(sequelize, DataTypes);
const CandidatePaymentType = require('./CandidatePaymentType')(sequelize, DataTypes);
const CandidatePayment = require('./CandidatePayment')(sequelize, DataTypes);
const SalaryPayment = require('./SalaryPayment')(sequelize, DataTypes);
const Expense = require('./Expense')(sequelize, DataTypes);
const RevenueType = require('./RevenueType')(sequelize, DataTypes);
const RevenueManual = require('./RevenueManual')(sequelize, DataTypes);
const RevenueAutomatic = require('./RevenueAutomatic')(sequelize, DataTypes);
const Journal = require('./Journal')(sequelize, DataTypes);
const Receipt = require('./Receipt')(sequelize, DataTypes);

// ===========================================
// ASSOCIATIONS
// ===========================================

// --- Candidates created by User ---
Candidate.belongsTo(User, { foreignKey: 'created_by' });

// --- Candidate Payments ---
Candidate.hasMany(CandidatePayment, { foreignKey: 'candidate_id' });
CandidatePayment.belongsTo(Candidate, { foreignKey: 'candidate_id', onDelete: 'CASCADE' });
CandidatePayment.belongsTo(CandidatePaymentType, { foreignKey: 'payment_type_id' });
CandidatePayment.belongsTo(Account, { foreignKey: 'account_id' });

// --- Salary Payments ---
SalaryPayment.belongsTo(Employee, { foreignKey: 'employee_id', onDelete: 'CASCADE' });
SalaryPayment.belongsTo(Account, { foreignKey: 'account_id' });

// --- Expenses ---
Expense.belongsTo(ExpenseCategory, { foreignKey: 'category_id' });
Expense.belongsTo(Account, { foreignKey: 'account_id' });
// Note: beneficiary_id is polymorphic, no direct simple association unless handled carefully

// --- Revenue Manual ---
RevenueManual.belongsTo(RevenueType, { foreignKey: 'revenue_type_id' });
RevenueManual.belongsTo(Account, { foreignKey: 'account_id' });
RevenueManual.belongsTo(User, { foreignKey: 'created_by' });

// --- Revenue Automatic ---
RevenueAutomatic.belongsTo(Candidate, { foreignKey: 'candidate_id' });
RevenueAutomatic.belongsTo(CandidatePaymentType, { foreignKey: 'payment_type_id' });
RevenueAutomatic.belongsTo(Account, { foreignKey: 'account_id' });
// source_id -> candidate_payments (polymorphic-ish, but check strict FK)

// --- Journal ---
Journal.belongsTo(Account, { foreignKey: 'account_id' });
// source_id is polymorphic

// --- Receipts ---
Receipt.belongsTo(Account, { foreignKey: 'account_id' });
// payer_id, source_id are polymorphic

// Export
module.exports = {
    sequelize,
    Sequelize,
    User,
    Employee,
    Account,
    Supplier,
    ExpenseCategory,
    Candidate,
    CandidatePaymentType,
    CandidatePayment,
    SalaryPayment,
    Expense,
    RevenueType,
    RevenueManual,
    RevenueAutomatic,
    Journal,
    Receipt
};
