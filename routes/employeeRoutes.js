const express = require("express");
const router = express.Router();
const {validateEmployees} = require('../middlewares/validateEmployee');
const {createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee} = require('../controllers/employeeController');
const upload = require('../middlewares/multer');


router.post('/employees',upload.single("photo"),validateEmployees,createEmployee);
router.get('/employees',getAllEmployees);
router.get('/employees/:id',getEmployeeById);
router.put('/employees/:id',upload.single("photo"),validateEmployees,updateEmployee);
router.delete('/employees/:id',deleteEmployee);


module.exports = router;



