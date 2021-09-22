const express = require('express');
const router = express.Router();

const { getDepartment, createDepartment, updateDepartment, deleteDepartment } = require('../controllers/department.js');

// 2. Departments
router.get('/', getDepartment);
router.post('/', createDepartment);
router.patch('/', updateDepartment);
router.delete('/', deleteDepartment);

module.exports = router;