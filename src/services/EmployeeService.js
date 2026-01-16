const { Employee } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment'); // Assumes moment is available, or use native Date

exports.generateEmployeeCode = async () => {
    const year = moment().format('YYYY');
    const prefix = `Emp${year}-`;

    const lastEmployee = await Employee.findOne({
        where: {
            employee_code: {
                [Op.like]: `${prefix}%`
            }
        },
        order: [['employee_code', 'DESC']]
    });

    let nextSequence = 1;
    if (lastEmployee && lastEmployee.employee_code) {
        const parts = lastEmployee.employee_code.split('-');
        if (parts.length === 2 && !isNaN(parts[1])) {
            nextSequence = parseInt(parts[1], 10) + 1;
        }
    }

    // Pad with leading zeros, e.g., 0001
    const sequencePart = nextSequence.toString().padStart(4, '0');
    return `${prefix}${sequencePart}`;
};

exports.createEmployee = async (data) => {
    console.log('DEBUG: EmployeeService.createEmployee received:', data);
    // Sanitize input
    if (data.monthly_salary === '') data.monthly_salary = null;

    // Default hire_date to today if missing (required field)
    if (!data.hire_date || data.hire_date === '') {
        data.hire_date = moment().format('YYYY-MM-DD');
    }

    if (data.phone === '') data.phone = null;
    if (data.job_function === '') data.job_function = null;

    // Validate Name (Required)
    if (!data.name || data.name.trim() === '') {
        throw new Error('Employee Name is required');
    }

    // Generate code if not provided
    if (!data.employee_code) {
        data.employee_code = await exports.generateEmployeeCode();
    }

    return await Employee.create(data);
};

exports.getAllEmployees = async (agency_id) => {
    const whereClause = agency_id ? { agency_id } : {};
    return await Employee.findAll({ where: whereClause });
};

exports.getEmployeeById = async (id) => {
    return await Employee.findByPk(id);
};

exports.updateEmployee = async (id, data) => {
    const employee = await Employee.findByPk(id);
    if (!employee) throw new Error('Employee not found');

    // Sanitize input
    if (data.monthly_salary === '') data.monthly_salary = null;
    if (data.phone === '') data.phone = null;
    if (data.job_function === '') data.job_function = null;

    return await employee.update(data);
};

exports.deleteEmployee = async (id) => {
    const employee = await Employee.findByPk(id);
    if (!employee) throw new Error('Employee not found');
    return await employee.update({ status: 'INACTIVE' });
};
