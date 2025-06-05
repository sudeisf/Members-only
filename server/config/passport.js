
const {ExtractJwt , Strategy } = require('passport-jwt')
const prisma = require('./client')
const options ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : process.env.JWT_ACCESS_SECRET,
}


const strategy = new JwtStratagey(options, async (payload , done)=>{
    try{
        const user  = await prisma.user.findUnique(
            {
                where: {id: payload.id}
            }
        );
        if (user) {
            return done(null, user);
          } else {
            return done(null, false); 
          }
    }catch(err){
        done(err,false)
    }
})





module.exports =(passport) =>{
    passport.use(strategy);
}