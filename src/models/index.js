const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PSWD,
});

// Import models
const Agency = require('./Agency')(sequelize, DataTypes);
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
const Bank = require('./Bank')(sequelize, DataTypes);

// ===========================================
// ASSOCIATIONS
// ===========================================

// --- Agency ---
Agency.hasMany(User, { foreignKey: 'agency_id' });
Agency.hasMany(Employee, { foreignKey: 'agency_id' });
Agency.hasMany(Account, { foreignKey: 'agency_id' });
Agency.hasMany(SalaryPayment, { foreignKey: 'agency_id' });
Agency.hasMany(Expense, { foreignKey: 'agency_id' });
Agency.hasMany(Candidate, { foreignKey: 'agency_id' });
Agency.hasMany(CandidatePayment, { foreignKey: 'agency_id' });
Agency.hasMany(RevenueManual, { foreignKey: 'agency_id' });
// Agency.hasMany(RevenueAutomatic, { foreignKey: 'agency_id' }); // Assuming added if table updated
Agency.hasMany(Journal, { foreignKey: 'agency_id' });

// --- Bank ---
Bank.hasMany(Account, { foreignKey: 'bank_id' });

// --- Users ---
User.belongsTo(Agency, { foreignKey: 'agency_id' });

// --- Employees ---
Employee.belongsTo(Agency, { foreignKey: 'agency_id' });

// --- Accounts ---
Account.belongsTo(Agency, { foreignKey: 'agency_id' });
Account.belongsTo(Bank, { foreignKey: 'bank_id' });

// --- Candidates created by User ---
Candidate.belongsTo(User, { foreignKey: 'created_by' });
Candidate.belongsTo(Agency, { foreignKey: 'agency_id' });

// --- Candidate Payments ---
Candidate.hasMany(CandidatePayment, { foreignKey: 'candidate_id' });
CandidatePayment.belongsTo(Candidate, { foreignKey: 'candidate_id', onDelete: 'RESTRICT' }); // SQL says RESTRICT
CandidatePayment.belongsTo(CandidatePaymentType, { foreignKey: 'payment_type_id', onDelete: 'RESTRICT' });
CandidatePayment.belongsTo(Account, { foreignKey: 'account_id', onDelete: 'RESTRICT' });
CandidatePayment.belongsTo(User, { foreignKey: 'created_by', onDelete: 'RESTRICT' });
CandidatePayment.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'RESTRICT' });

// --- Salary Payments ---
SalaryPayment.belongsTo(Employee, { foreignKey: 'employee_id', onDelete: 'RESTRICT' }); // SQL says RESTRICT
SalaryPayment.belongsTo(Account, { foreignKey: 'account_id', onDelete: 'RESTRICT' });
SalaryPayment.belongsTo(User, { foreignKey: 'created_by', onDelete: 'RESTRICT' });
SalaryPayment.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'RESTRICT' });

// --- Expenses ---
Expense.belongsTo(ExpenseCategory, { foreignKey: 'category_id', onDelete: 'RESTRICT' });
Expense.belongsTo(Account, { foreignKey: 'account_id', onDelete: 'RESTRICT' });
Expense.belongsTo(User, { foreignKey: 'created_by', onDelete: 'RESTRICT' });
Expense.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'RESTRICT' });

// --- Revenue Manual ---
RevenueManual.belongsTo(RevenueType, { foreignKey: 'revenue_type_id', onDelete: 'RESTRICT' });
RevenueManual.belongsTo(Account, { foreignKey: 'account_id', onDelete: 'RESTRICT' });
RevenueManual.belongsTo(User, { foreignKey: 'created_by', onDelete: 'RESTRICT' });
RevenueManual.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'RESTRICT' });

// --- Revenue Automatic ---
RevenueAutomatic.belongsTo(Candidate, { foreignKey: 'candidate_id' });
RevenueAutomatic.belongsTo(CandidatePaymentType, { foreignKey: 'payment_type_id' });
RevenueAutomatic.belongsTo(Account, { foreignKey: 'account_id' });

// --- Journal ---
Journal.belongsTo(Account, { foreignKey: 'account_id', onDelete: 'RESTRICT' });
Journal.belongsTo(User, { foreignKey: 'created_by', onDelete: 'RESTRICT' });
Journal.belongsTo(Agency, { foreignKey: 'agency_id', onDelete: 'RESTRICT' });

// --- Receipts ---
Receipt.belongsTo(Account, { foreignKey: 'account_id' });

// Export
module.exports = {
    sequelize,
    Sequelize,
    Agency,
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
    Receipt,
    Bank
};
