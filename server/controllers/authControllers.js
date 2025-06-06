const utils = require('../utils/utils')
const prisma = require("../config/client")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/mailer")
const bcrypt = require('bcrypt')

const register = async (req, res) => {

    try{
        const { email, password, confirmPassword ,firstName, lastName }  = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
          }
        
        if (confirmPassword !== password) {return res.status(400).json({ error: 'password does not match.' });}

        const existingUser =  await prisma.user.findUnique({where : { email}});

        if (existingUser){
            res.status(400).json({error: 'Email already registered'})
        }

        const hashedPassword = await utils.generatePassword(password);

        const newUser = await prisma.user.create({
            data : {
                firstName,
                lastName,
                email,
                password : hashedPassword
            }
        });

        const tokens = utils.GenerateToken(user,rememberMe);
        
        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 
      });

        return res.status(201).json({
            message : 'User registered successfully',
            accessToken : tokens.accessToken,
            user : {
              id: newUser.id,
              email: newUser.email,
              firstName: newUser.firstName,
              lastName: newUser.lastname,
            }
        })
    }catch(error){
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });    
    }
}

const login  = async (req , res) => {
    try{
      const { email, password, rememberMe } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
          }
        
        const user = await prisma.user.findUnique( { where : {email}})

        if(!user) { res.status(201).json({error : 'Invalid email or password'})}
         
        const isMatch  = await utils.validPassword(password , user.password);

        if (!isMatch){
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const tokens = utils.GenerateToken(user,rememberMe);
        
        res.cookie('refreshToken', tokens.refreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 * 1000 
      });

        return res.status(200).json({
            accessToken : tokens.accessToken,
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastname,
            },
          });
          
        }catch(err){
            console.log(err)
            res.status(500).json({error: 'Internal server error' })
        }
}


const refreshToken = async (req, res) => {
  try {
    const refreshToken =
      req.cookies?.refreshToken || req.headers['authorization']?.split(' ')[1];

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token missing' });
    }


    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
     
    } catch (err) {
      console.error('Token verification error:', err.message);
      return res.status(401).json({ error: 'Invalid or expired refresh token' });
    }

   
    const revokedToken = await prisma.revokedToken.findUnique({
      where: { jti: decoded.jti },
    });
    if (revokedToken) {
      return res.status(401).json({ error: 'Token is revoked' });
    }

 
    const blacklisted = await prisma.blacklistedToken.findUnique({
      where: { token: refreshToken },
    });
    if (blacklisted) {
      return res.status(401).json({ error: 'Token is blacklisted' });
    }

  
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }


    const tokens = utils.GenerateToken(user, false); 

 
    await prisma.blacklistedToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });


    await prisma.revokedToken.create({
      data: {
        jti: decoded.jti,
        expiresAt: new Date(decoded.exp * 1000),
      },
    });


    res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      accessToken: tokens.accessToken,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastname,
      },
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    return res.status(500).json({ error: 'Internal server error' }); 
  }
};


const logout = async (req,res) => {
      try{
        const refreshToken =
        req.cookies?.refreshToken || req.headers['authorization']?.split(' ')[1];
  
      if (!refreshToken) {
        return res.status(401).json({ error: 'Refresh token missing' });
      }

         if(!refreshToken){
            return res.status(400).json("refresh token missing")
         }

         let decoded;
         try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
          } catch (err) {
            res.clearCookie('refreshToken', {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict',
            });
            return res.status(200).json({ message: 'Logged out' });
          }

          await prisma.blacklistedToken.create({
            data: {
              token: refreshToken,
              expiresAt: new Date(decoded.exp * 1000),
            },
          });

          if (decoded.jti) {
            await prisma.revokedToken.create({
              data: {
                jti: decoded.jti,
                expiresAt: new Date(decoded.exp * 1000),
              },
            });
          }
          res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
          });
          res.status(200).json({ success : true , message: 'Logged out successfully' });
      }catch(error){
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}

const sendOtp = async (req,res) => {
        try{
            const {email} = req.body;
            if (!email) {return  res.status(400).json("email is required")}

            const otp = await utils.generateOTP()
            const otpcode = otp.otp;
            const hashedOTP = otp.hashedCode;

            const response = await prisma.otp.create({
                data: {
                  code: hashedOTP,
                  email: email,
                  expiresAt: new Date(Date.now() + 5 * 60 * 1000), 
                },
              });

              if(response){
                 sendEmail(
                    {
                        to :email,
                        subject : "OTP CODE",
                        otp : otpcode
                    })
                    res.status(200).json({
                        success : true ,
                        message : "verification send to your email check it"
                    })
              }else{
                return res.status(500).json({ error: "Failed to save OTP" });
              }
        }catch(error){
            console.error(error)
            res.status(500).json("internal server error")
        }
}


const verifyOTP = async (req, res) => {
    try{

        const {email, otp} = req.body;
        if(!email || !otp) {return res.status(400).json({ error: "Email and OTP are required" });}

        const fetchOtp = await prisma.otp.findFirst({
          where: {
            email,
            expiresAt: {
              gt: new Date(), 
            },
            used: false,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

          if (!fetchOtp) {
            return res.status(400).json({ success: false, message: "OTP not found or expired" });
          }
        if(fetchOtp){
            const otpHashcode = fetchOtp.code;
            const isMatch = await bcrypt.compare(otp,otpHashcode);
            if(isMatch){
                res.status(200).json({success : true})
            }else{
                res.status(200).json({success : false, message : "invalid otp code"})
            }
        }
    }catch(error){
        console.error(error)
        res.status(500).json("internal server error")
    }
}

const newPassword = async (req, res) => {
    try{
        const {password, confirmPassword , email} = req.body;
        if(!password || !confirmPassword || !email) {return res.status(400).json({ error: "full inputs required are required" });}
        if(password !== confirmPassword) {return res.status(400).json({error: "password does not match"})}
        const user = await prisma.user.findUnique({where : {email}})
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        const hashedPassword = await utils.generatePassword(password);
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword }
        });

        await prisma.otp.deleteMany({
            where: { email }
        });

        res.status(200).json({
            message: "Password updated successfully"
        });

    }catch(err){
        console.error('Password reset error:', err);
        res.status(500).json({ error: "Internal server error" });
    }
}


module.exports ={
    login,
    logout,
    register,
    refreshToken,
    sendOtp,
    newPassword,
    verifyOTP
}