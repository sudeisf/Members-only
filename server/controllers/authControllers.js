const utils = require('../utils/utils')
const prisma = require("../config/client")
const jwt = require("jsonwebtoken")



const register = async (req, res) => {

    try{
        const { email, password, firstName, lastName }  = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
          }

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

        res.status(201).json({
            message : 'User registered successfully',
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        })
    }catch(err){
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });    
    }
}

const login  = async (req , res) => {
    try{
        const {email, password , remeberMe} = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
          }
        
        const user = await prisma.user.findUnique( { where : {email}})

        if(user) { res.status(201).json({error : 'Invalid email or password'})}
         
        const isMatch  = await utils.validPassword(password , user.password);

        if (!isMatch){
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const tokens = utils.GenerateToken(user,remeberMe);

        res.status(200).json({
            accessToken : tokens.accessToken,
            refreshToken : tokens.refreshToken,
            user: {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
            },
          });
          
        }catch(err){
            console.log(err)
            res.status(500).json({error: 'Internal server error' })
        }
}

const refreshToken = async (req, res) => {
        try{
            const {refreshToken} = req.cookies?.refreshToken || req.headers['authorization']?.split(' ')[1];
            if (!refreshToken){
                return res.status(401).json({ error: 'Refresh token missing' });
            }
            const decoded = jwt.verify(refreshToken,process.env.JWT_REFRESH_TOKEN_SECRET)
            const jti  = decoded.jti

            const revokedToken = await prisma.revokedToken.findUnique({where : {jti}})
            if(!revokedToken) return res.status(401).json({ error: 'Token is revoked' });

            const blacklisted = await prisma.blacklistedToken.findUnique({ where: { token: refreshToken } });
            if (blacklisted) return res.status(401).json({ error: 'Token is blacklisted' });

            const user = await prisma.user.findUnique({ where: { id: decoded.id } });
            if (!user) return res.status(401).json({ error: 'User not found' });

            const token  = utils.GenerateToken(user);

            await prisma.blacklistedToken.create({
                data: {
                    token : refreshToken,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                }
            });

            await prisma.revokedToken.create({
                data: {
                  jti,
                  expiresAt: new Date(decoded.exp * 1000),
                },
              });
            
            res.cookie('refreshToken', token.refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000 
            });

            return res.status(200).json({
                accessToken : token.accessToken,
                user: {
                    id: user.id,
                    email: user.email,
                }
            });

            
        }catch(error){
            console.error(err)
            res.status(500).json("inetrnal server error")
        }
}


const logout = async (req,res) => {
      try{
         const refreshToken  = req.cookie?.refreshToken;

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
          res.status(200).json({ message: 'Logged out successfully' });
      }catch(error){
        console.error('Logout error:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}
