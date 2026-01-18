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
                model: 'alsuwedi_agencies',
                key: 'id'
            }
        },
        revenue_type_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alsuwedi_revenue_types',
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
                model: 'alsuwedi_accounts',
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
                model: 'alsuwedi_users',
                key: 'id'
            }
        }
    }, {
        tableName: 'alsuwedi_revenue_manual',
        timestamps: false
    });

    return RevenueManual;
};
