const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Account = sequelize.define('Account', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        type: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['CASH', 'BANK', 'MOBILE']]
            }
        },
        balance: {
            type: DataTypes.REAL,
            defaultValue: 0,
            validate: {
                min: 0
            }
        }
    }, {
        tableName: 'accounts',
        timestamps: false
    });

    return Account;
};
