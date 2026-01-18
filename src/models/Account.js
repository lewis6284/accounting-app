const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Account = sequelize.define('Account', {
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
        bank_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'alsuwedi_banks',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['CASH', 'BANK', 'MOBILE']]
            }
        },
        currency: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['FBu', 'USD', 'EUR', 'OMR', 'SAR', 'AED']]
            }
        },
        balance: {
            type: DataTypes.REAL,
            defaultValue: 0,
            allowNull: false
        }
    }, {
        tableName: 'alsuwedi_accounts',
        timestamps: false
    });

    return Account;
};
