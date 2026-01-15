module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        employee_code: {
            type: DataTypes.STRING,
            unique: true
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'ACTIVE' // 'ACTIVE', 'INACTIVE'
        },
        job_function: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        monthly_salary: {
            type: DataTypes.DECIMAL(10, 2)
        },
        hire_date: {
            type: DataTypes.DATEONLY
        }
    }, {
        tableName: 'Employees',
        timestamps: true
    });

    return Employee;
};
