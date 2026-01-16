const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/EmployeeController');
const checkAuth = require('../middleware/authMiddleware');

router.get('/', checkAuth, EmployeeController.getAllEmployees);
router.post('/', checkAuth, EmployeeController.createEmployee);
router.get('/:id', checkAuth, EmployeeController.getEmployeeById);
router.put('/:id', checkAuth, EmployeeController.updateEmployee);
router.delete('/:id', checkAuth, EmployeeController.deleteEmployee);

module.exports = router;
