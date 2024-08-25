const path = require("path");
const pool = require("./database");
const JwtStratagey = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const fs = require('fs');

const pathToKey = path.join(__dirname,'..',"id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey,'utf8');



const options ={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : PUB_KEY,
    algorithm: ['RS256']
}


const strategy = new JwtStratagey(options, async (payload , done)=>{
    try{
        const result  = await pool.query('select * from users where id = $1' , [payload.sub]);
        const user = result.rows[0];
        done(null,user);
    }catch(err){
        done(err,false)
    }

})





module.exports =(passport) =>{
    passport.use(strategy);
}