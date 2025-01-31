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
        
        const hashedPwd = await utilis.genPwd(newUser.password);
        const result = await pool.query("Insert into users (firstname,lastname,password,email) values ($1,$2,$3,$4) returning *;",
            [
                newUser.firstname,
                newUser.lastname,
                hashedPwd,
                newUser.email
            ]
        );
        const user = result.rows[0];
        const jwt  = utilis.issueJWT(user);

        res.cookie('token', jwt.token,{
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: jwt.expires 
        })

        res.status(200).json({
            succes: true,
            user: user,
            mesasage : "User has been created successfully",
        });

        }catch(err){
        next(err)
        }
    }



const getUserController = async (req, res, next) => {
    const user_id = req.user.id;
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
        const user = result.rows[0];
        console.log(user)
        return res.status(200).json({ success: true, user: user });
    } catch (err) {
        next(err);
    }
};

async function loginControllerPost(req, res, next) {
    try {
        const loginUser = {
            email: req.body.email,
            password: req.body.password,
        };

      
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [loginUser.email]);
        const user = result.rows[0];

        
        if (!user) {
            return res.status(401).json({succes: false , msg : 'user not found'});
        }

      
        const isValid = await utilis.validPassword(loginUser.password, user.password);

        
        if (isValid) {
            const tokenObj = utilis.issueJWT(user);
            return res.status(200).json({ success: true, user: user, token: tokenObj.token, expiresIn: tokenObj.expires , redirectUrl : '/home' });
        } else {
           
            return res.status(401).json({ success: false, msg: "Invalid password" });
        }
    } catch (err) {
        next(err);
    }
}







module.exports = {
    registerControllerPost,
    loginControllerPost,
    getUserController
}