const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');


const pathToKey = path.join(__dirname,'..',"id_rsa_priv.pem");
const PRIV_KEY = fs.readFileSync(pathToKey,'utf8');




const validPassword = (password,hashedPassword)=>{
    const match  = bcrypt.compare(password,hashedPassword);
    return match
}

const genPwd = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        console.log('Hash completed');
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
        iat: Date.now()
    };

    const signedToken  = jsonwebtoken.sign(payload,PRIV_KEY,{algorithm: 'RS256'});
    return {
        token: "bearer" + signedToken,
        expires :expiresIn
    }
}
module.exports ={
    validPassword,
    genPwd,
    issueJWT
}