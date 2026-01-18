const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const ExpenseCategory = sequelize.define('ExpenseCategory', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'alsuwedi_expense_categories',
        timestamps: false
    });

    return ExpenseCategory;
};
