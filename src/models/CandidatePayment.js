const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CandidatePayment = sequelize.define('CandidatePayment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        candidate_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        payment_type_id: {
            type: DataTypes.INTEGER,
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
        payment_date: {
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
        tableName: 'candidate_payments',
        timestamps: false
    });

    return CandidatePayment;
};
