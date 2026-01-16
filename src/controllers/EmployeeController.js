const EmployeeService = require('../services/EmployeeService');

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await EmployeeService.getAllEmployees(req.user.agency_id);
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.createEmployee({
            ...req.body,
            agency_id: req.body.agency_id || req.user.agency_id
        });
        res.status(201).json(employee);
    } catch (err) {
        console.error('Create Employee Error Stack:', err.stack); // Log full stack
        console.error('Create Employee Error Message:', err.message);

        if (err.name === 'SequelizeValidationError' || err.message.includes('required')) {
            return res.status(400).json({ error: err.message });
        }
        res.status(500).json({
            error: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const employee = await EmployeeService.getEmployeeById(req.params.id);
        if (!employee) return res.status(404).json({ error: 'Employee not found' });
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const employee = await EmployeeService.updateEmployee(req.params.id, req.body);
        res.json(employee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        await EmployeeService.deleteEmployee(req.params.id);
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
