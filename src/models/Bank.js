const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Bank = sequelize.define('Bank', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        code: {
            type: DataTypes.TEXT,
            unique: true
        },
        address: {
            type: DataTypes.TEXT
        },
        country: {
            type: DataTypes.TEXT,
            defaultValue: 'Burundi'
        }
    }, {
        tableName: 'banks',
        timestamps: false
    });

    return Bank;
};
