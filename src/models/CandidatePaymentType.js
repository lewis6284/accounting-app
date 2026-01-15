const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const CandidatePaymentType = sequelize.define('CandidatePaymentType', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'candidate_payment_types',
        timestamps: false
    });

    return CandidatePaymentType;
};
