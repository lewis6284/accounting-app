const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Expense = sequelize.define('Expense', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        amount: {
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 0.01 // > 0
            }
        },
        currency: {
            type: DataTypes.TEXT,
            defaultValue: 'Fbu'
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        beneficiary_type: {
            type: DataTypes.TEXT,
            validate: {
                isIn: [['SUPPLIER', 'EMPLOYEE', 'OTHER']]
            }
        },
        beneficiary_id: {
            type: DataTypes.INTEGER
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'expenses',
        timestamps: false
    });

    return Expense;
};
