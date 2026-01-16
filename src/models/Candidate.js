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
                model: 'agencies',
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
        position_applied: {
            type: DataTypes.TEXT
        },
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'PENDING',
            validate: {
                isIn: [['PENDING', 'PAID', 'READY', 'DEPLOYED', 'CANCELLED']]
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
