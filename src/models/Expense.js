const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Expense = sequelize.define('Expense', {
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        amount: {
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 0.01
            }
        },
        category_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'alsuwedi_expense_categories',
                key: 'id'
            }
        },
        beneficiary_type: {
            type: DataTypes.TEXT
        },
        beneficiary_id: {
            type: DataTypes.INTEGER
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
        },
        description: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'VALID',
            validate: {
                isIn: [['VALID', 'CANCELLED']]
            }
        }
    }, {
        tableName: 'alsuwedi_expenses',
        timestamps: false
    });

    return Expense;
};
