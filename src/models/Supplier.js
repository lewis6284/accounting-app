const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Supplier = sequelize.define('Supplier', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT,
            unique: true
        }
    }, {
        tableName: 'alsuwedi_suppliers',
        timestamps: false
    });

    return Supplier;
};
