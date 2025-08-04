const {body,validationResult} = require("express-validator");

const validateRegister = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  (req,res,next)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: error.array(),
      });


    }

    next();
  }
];

const validateLogin = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({
        success: false,
        message: "Validation failed",
        errors: error.array(),
      });
    }
    next();
  }
];

module.exports =  {validateRegister,validateLogin};



