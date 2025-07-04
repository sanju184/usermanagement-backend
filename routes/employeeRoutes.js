const express = require("express");
const router = express.Router();
const {validateEmployees} = require('../middlewares/validateEmployee');
const {createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee} = require('../controllers/employeeController');


router.post('/employees',validateEmployees,createEmployee);
router.get('/employees',validateEmployees,getAllEmployees);
router.get('/employees/:id',validateEmployees,getEmployeeById);
router.put('/employees/:id',validateEmployees,updateEmployee);
router.delete('/employees/:id',validateEmployees,deleteEmployee);


module.exports = router;



