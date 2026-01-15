const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RevenueManual = sequelize.define('RevenueManual', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        revenue_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        revenue_name: {
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
        description: {
            type: DataTypes.TEXT
        },
        created_by: {
            type: DataTypes.INTEGER
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'revenue_manual',
        timestamps: false
    });

    return RevenueManual;
};
