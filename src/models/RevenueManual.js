const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RevenueManual = sequelize.define('RevenueManual', {
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
        revenue_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'revenue_types',
                key: 'id'
            }
        },
        revenue_name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.REAL,
            allowNull: false,
            validate: {
                min: 0.01
            }
        },
        date: {
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
        description: {
            type: DataTypes.TEXT
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
        tableName: 'revenue_manual',
        timestamps: false
    });

    return RevenueManual;
};
