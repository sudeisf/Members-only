const utils = require('../utils/utils')
const prisma = require("../config/client")



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