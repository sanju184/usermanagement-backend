const employee = require('../models/employee');




const createEmployee = async(req,res)=>{
     const { name, email, position,salary } = req.body;
      const photo = req.file ? req.file.filename : null;

      

     try{
         
     const existEmployees = await employee.findOne({email});

       if(existEmployees){
        return res.status(400).json({error:"user allready exist"});

       }
        
        const newEmployee = await employee.create({name, email, position, salary,photo});
        res.status(201).json(
            {   
                success : true,
                message:"Employee created successfully",
                data:newEmployee
            }
        )
       

     }catch(err){
            res.status(500).json({error: "Server error", details: err.message})
     }

}



const getAllEmployees = async(req,res)=>{
         try{
              const allEmployees = await employee.find();
              res.status(200).json(allEmployees);
         }catch(err){
              res.status(500).json({message:"Erorr in fetching employees" , error:err.message});
         }
}

const getEmployeeById = async(req,res)=>{
       try{
             const singleEmployee = await employee.findById(req.params.id);
             res.status(200).json(singleEmployee);
       }catch(err){
             res.status(404).json({ error: "Not found" });
       }
}

const updateEmployee = async (req, res) => {

     
  try {
    let updateData = { ...req.body };
    if (req.file) {
      updateData.photo = req.file.filename;
    }
    const updateEmp = await employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updateEmp) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Update Successfully",
      data: updateEmp
    });
  } catch (err) {
    res.status(400).json({
      message: "Error in updating employee",
      error: err.message
    });
  }
};


const deleteEmployee = async(req,res)=>{
        try{
             await employee.findByIdAndDelete(req.params.id);
             res.json({ message: "Employee deleted" });
        }catch(err){
             res.status(500).json({ message:"error in delete user " ,error: err.message });
        }
}


module.exports = {createEmployee,getAllEmployees,getEmployeeById,updateEmployee,deleteEmployee}



