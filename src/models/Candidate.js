const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Candidate = sequelize.define('Candidate', {
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
        candidate_code: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false
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
            type: DataTypes.TEXT
        },
        marital_status: {
            type: DataTypes.TEXT
        },
        passport_number: {
            type: DataTypes.TEXT
        },
        national_id: {
            type: DataTypes.TEXT
        },
        passport_status: {
            type: DataTypes.TEXT
        },
        passport_issue_date: {
            type: DataTypes.DATEONLY
        },
        passport_expiry_date: {
            type: DataTypes.DATEONLY
        },

        position_applied: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'PENDING',
            validate: {
                isIn: [['PENDING', 'APPROVED', 'REJECTED', 'PAID', 'READY', 'DEPLOYED', 'CANCELLED']]
            }

        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'alsuwedi_users',
                key: 'id'
            }
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'alsuwedi_candidates',
        timestamps: false
    });

    return Candidate;
};
