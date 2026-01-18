const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const SalaryPayment = sequelize.define('SalaryPayment', {
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
        employee_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alsuwedi_employees',
                key: 'id'
            }
        },
        month: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 0.01 // > 0
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
        tableName: 'alsuwedi_salary_payments',
        timestamps: false
    });

    return SalaryPayment;
};
