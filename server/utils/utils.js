const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const pathToKey = path.join(__dirname,'..',"id_rsa_priv.pem");
const PRIV_KEY = process.env.PRIV_KEY || fs.readFileSync(pathToKey,'utf8');




const validPassword = (password,hashedPassword)=>{
    const match  = bcrypt.compare(password,hashedPassword);
    return match
}

const genPwd = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.error('Hashing error:', err);
        throw err;  // Propagate the error
    }
}



const issueJWT = (user) =>{
    const id = user.id;
    const expiresIn = '1d';

    const payload = {
        sub: id,
        iat: Math.floor(Date.now() / 1000), // Issued at, in seconds
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // Expiration: 24 hours from now (in seconds)
    };

    const signedToken  = jsonwebtoken.sign(payload,PRIV_KEY,{algorithm: 'RS256'});
    return {
        token: "Bearer " + signedToken,
        expires :expiresIn
    }
}
module.exports ={
    validPassword,
    genPwd,
    issueJWT
}