const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Journal = sequelize.define('Journal', {
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
        },
        transaction_type: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        source_table: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        source_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        currency: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: {
            type: DataTypes.REAL,
            allowNull: false
        },
        balance_after: {
            type: DataTypes.REAL,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'journal',
        timestamps: false
    });

    return Journal;
};
