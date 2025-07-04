const {body,validationResult} = require("express-validator");

const validateEmployees = [
    body("name").notEmpty().withMessage("Name is Require"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("position").notEmpty().withMessage("Position is required"),
    body("salary").isNumeric().withMessage("Salary must be a number"),

    (req,res,next)=>{
        const  errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                success:false,
                message:"validation Error",
                data:  errors.array(),
            });
        }

        next();
    }
];

module.exports = { validateEmployees };