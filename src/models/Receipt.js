const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Receipt = sequelize.define('Receipt', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        receipt_number: {
            type: DataTypes.TEXT,
            unique: true
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
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payer_type: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['CANDIDATE', 'CUSTOMER', 'PARTNER']]
            }
        },
        payer_id: {
            type: DataTypes.INTEGER
        },
        source_table: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['candidate_payments', 'revenue_manual']]
            }
        },
        source_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'receipts',
        timestamps: false
    });

    return Receipt;
};
