const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const RevenueType = sequelize.define('RevenueType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        country: {
            type: DataTypes.TEXT
        },
        city: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'revenue_types',
        timestamps: false
    });

    return RevenueType;
};
