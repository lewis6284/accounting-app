const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        phone: {
            type: DataTypes.TEXT
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isIn: [['ADMIN', 'ACCOUNTANT']]
            }
        },
        agency_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'alsuwedi_agencies',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'alsuwedi_users',
        timestamps: false
    });

    return User;
};
