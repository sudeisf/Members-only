const { body , validationResult } = require('express-validator');
 

const validator  = [
    body('firstname')
    .notEmpty()
    .withMessage("firstname is required")
    .isLength({min:3})
    .custom((value)=>{
        if(/\s/.test(value)) {
            throw new Error("names should not cosntain spaces.")
        }
        return true
    }),
    
    body('lastname')
    .notEmpty()
    .withMessage("firstname is required")
    .isLength({min:3})
    .custom((value)=>{
        if(/\s/.test(value)) {
            throw new Error("names should not cosntain spaces.")
        }
        return true
    }),

    //email validation
    body('email')
    .isEmail()
    .withMessage('please enter a valid email address'),

    //password validation
    body('password')
    .isLength({min:8})
    .withMessage("password must be at least  8 characters long")
    .matches(/\d/)
    .withMessage('Password must contain a number')
    .matches(/[A-Z]/)
    .withMessage('Password must contain an uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain a special character'),
    
    body('passwordConfirmation').custom((value, { req }) => {
        return value === req.body.password;
      }),
    
]

module.exports = {
    validator,
    validationResult
}