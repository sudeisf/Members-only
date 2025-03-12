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

       req.session.user = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
       }

        res.status(200).json({
            success: true,
            user: req.session.user,
            message : "User has been created successfully",
        });

        }catch(err){
        next(err)
        }
    }



const getUserController = async (req, res, next) => {
    const user_id = req.session.user.id;
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
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "Email and password are required" });
        }

        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ success: false, type: 'user', msg: 'User not found' });
        }

        const isValid = await utilis.validPassword(password, user.password);
        if (!isValid) {
            return res.status(401).json({ success: false, type: 'password', msg: "Invalid password" });
        }

        const tokenObj = utilis.issueJWT(user);
        req.session.user = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        };

        res.status(200).json({ success: true, user: req.session.user, token: tokenObj.token, expiresIn: tokenObj.expires });

    } catch (err) {
        console.error("Login error:", err);
        next(err);
    }
}








module.exports = {
    registerControllerPost,
    loginControllerPost,
    getUserController
}