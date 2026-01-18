const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Employee = sequelize.define('Employee', {
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
        employee_code: {
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
        job_function: {
            type: DataTypes.TEXT
        },
        monthly_salary: {
            type: DataTypes.REAL,
            validate: {
                min: 0
            }
        },
        hire_date: {
            type: DataTypes.DATEONLY
        },
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'ACTIVE',
            validate: {
                isIn: [['ACTIVE', 'INACTIVE', 'SUSPENDED']]
            }
        }
    }, {
        tableName: 'alsuwedi_employees', // Changed from 'Employees' to 'employees' to match SQL
        timestamps: false
    });

    return Employee;
};
