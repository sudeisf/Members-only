const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');


const validPassword = (password,hashedPassword)=>{
    const match  = bcrypt.compare(password,hashedPassword);
    return match
}

const generatePassword = async (password) => {
    try {
        const hash = await bcrypt.hash(password, 10);
        return hash;
    } catch (err) {
        console.error('Hashing error:', err);
        throw err;  
    }
}

const GenerateToken = (user , rememberMe) =>{
    const accessToken = jwt.sign(
        { id: user.id },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: '15m' }
      );

      const refreshExpiry = rememberMe ? '30d' : '1d'; 
    
      const jti = uuidv4();

      const refreshToken = jwt.sign(
        { id: user.id, jti },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: refreshExpiry }
      );

      return { accessToken, refreshToken ,jti };
} 

module.exports ={
    validPassword,
    generatePassword,
    GenerateToken
}