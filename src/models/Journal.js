const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Journal = sequelize.define('Journal', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['ENTRY', 'EXIT']]
            }
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
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        source_table: {
            type: DataTypes.TEXT,
            validate: {
                isIn: [['revenue_manual', 'revenue_automatic', 'expenses', 'salary_payments']]
            }
        },
        source_id: {
            type: DataTypes.INTEGER
        },
        balance_after: {
            type: DataTypes.REAL,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'journal',
        timestamps: false
    });

    return Journal;
};
