const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CandidatePayment = sequelize.define('CandidatePayment', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        agency_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'agencies',
                key: 'id'
            }
        },
        candidate_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'candidates',
                key: 'id'
            }
        },
        payment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'candidate_payment_types', // Assumed table name from SQL
                key: 'id'
            }
        },
        amount: {
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 0.01
            }
        },
        payment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        account_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'accounts',
                key: 'id'
            }
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        }
    }, {
        tableName: 'candidate_payments',
        timestamps: false
    });

    return CandidatePayment;
};
