const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Candidate = sequelize.define('Candidate', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        candidate_code: {
            type: DataTypes.TEXT,
            unique: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        phone: {
            type: DataTypes.TEXT
        },
        email: {
            type: DataTypes.TEXT
        },
        nationality: {
            type: DataTypes.TEXT
        },
        gender: {
            type: DataTypes.TEXT,
            validate: {
                isIn: [['MALE', 'FEMALE', 'OTHER']]
            }
        },
        marital_status: {
            type: DataTypes.TEXT,
            validate: {
                isIn: [['SINGLE', 'MARRIED', 'DIVORCED']]
            }
        },
        passport_number: {
            type: DataTypes.TEXT,
            unique: true
        },
        passport_issue_date: {
            type: DataTypes.DATEONLY
        },
        passport_expiry_date: {
            type: DataTypes.DATEONLY
        },
        passport_status: {
            type: DataTypes.TEXT,
            defaultValue: 'NONE',
            validate: {
                isIn: [['NONE', 'APPLIED', 'ISSUED', 'EXPIRED']]
            }
        },
        national_id: {
            type: DataTypes.TEXT,
            unique: true
        },
        position_applied: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'PENDING',
            validate: {
                isIn: [['PENDING', 'APPROVED', 'REJECTED', 'DEPLOYED']]
            }
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'candidates',
        timestamps: false
    });

    return Candidate;
};
