const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RevenueAutomatic = sequelize.define('RevenueAutomatic', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        source_table: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['candidate_payments']]
            }
        },
        source_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        candidate_id: {
            type: DataTypes.INTEGER
        },
        payment_type_id: {
            type: DataTypes.INTEGER
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'revenue_automatic',
        timestamps: false
    });

    return RevenueAutomatic;
};
