const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Agency = sequelize.define('Agency', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        location: {
            type: DataTypes.TEXT
        },
        currency: {
            type: DataTypes.TEXT,
            defaultValue: 'FBu'
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
        tableName: 'alsuwedi_agencies',
        timestamps: false
    });

    return Agency;
};
