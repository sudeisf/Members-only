const utilis = require('../utils/utils');
const {validationResult} = require('express-validator');
const pool = require('../config/database');



async function registerControllerPost (req, res,next) {

     try{
        const err = validationResult(req);
        if(!err.isEmpty()){
            return res.status(400).json({ errors: err.array() });
        }
        const newUser = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }

        //debugging 
        // for (const key in newUser) {
        //     if (newUser.hasOwnProperty(key)) {
        //         console.log(`${key}: ${newUser[key]}`);
        //     }
        // }
        
        const hashedPwd = await utilis.genPwd(newUser.password);
        const result = await pool.query("Insert into users (first_name,last_name,password,email) values ($1,$2,$3,$4) returning *;",
            [
                newUser.firstname,
                newUser.lastname,
                hashedPwd,
                newUser.email
            ]
        );
        const user = result.rows[0];
        const jwt  = utilis.issueJWT(user);
        res.status(200).json({
            succes: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires
        })
     }catch(err){
        next(err)
     }
}








module.exports = {
    registerControllerPost
}