const utilis = require('../utils/utils');
const {validationResult} = require('express-validator');
const pool = require('../config/database');
const jwt = require('jsonwebtoken')



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

const {genPwd}  = require('../utils/utils')

const updateUser = async (req, res) => {
    try {
        const user_id = req.session.user.id;
        const { firstname, lastname, newPassword, confirmPassword } = req.body;

        // Prepare fields to update
        const updates = [];
        const values = [];
        let index = 1;

        if (firstname) {
            updates.push(`firstname = $${index++}`);
            values.push(firstname);
        }

        if (lastname) {
            updates.push(`lastname = $${index++}`);
            values.push(lastname);
        }

        if (newPassword || confirmPassword) {
            if (!newPassword || !confirmPassword) {
                return res.status(400).json({ message: "Both password fields are required" });
            }

            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }

            const hashedPassword = await genPwd(newPassword, 10);
            updates.push(`password = $${index++}`);
            values.push(hashedPassword);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: "No fields provided for update" });
        }

        values.push(user_id); 

        const query = `UPDATE users SET ${updates.join(", ")} WHERE id = $${index}`;
        const result = await pool.query(query, values);

        if (result.rowCount > 0) {
            return res.status(200).json({ message: "User updated successfully" });
        } else {
            return res.status(404).json({ message: "User not found" });
        }

    } catch (err) {
        console.error("Update error:", err.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};











module.exports = {
    registerControllerPost,
    loginControllerPost,
    getUserController,
    updateUser
}