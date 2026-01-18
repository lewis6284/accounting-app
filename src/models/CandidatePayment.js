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
                model: 'alsuwedi_agencies',
                key: 'id'
            }
        },
        candidate_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alsuwedi_candidates',
                key: 'id'
            }
        },
        payment_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alsuwedi_candidate_payment_types',
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
                model: 'alsuwedi_accounts',
                key: 'id'
            }
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alsuwedi_users',
                key: 'id'
            }
        }
    }, {
        tableName: 'alsuwedi_candidate_payments',
        timestamps: false
    });

    return CandidatePayment;
};
