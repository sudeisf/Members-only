const express = require('express');
const app = express();
const path  = require('path');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./config/database');
const passport = require('passport');
const routes = require('./routes/userRoutes')
const cors = require('cors');
require('dotenv').config();



app.use(express.static(path.join(__dirname,'Public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'users'
    }),
    secret: "12345678",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        sameSite: 'lax' // Helps with cross-origin issues
    }
}));

//may allow me to make request from http of client side / react
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Corrected typo here
    credentials: true, // Allow sending cookies with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Add more methods if needed
    allowedHeaders: ['Content-Type', 'Authorization'] // Add headers that your frontend might send
}));


require('./config/passport')(passport);
app.use(passport.session());


// router 
app.use('/api',routes);
app.use('/',(req,res)=>{
    res.send("hello world")
})




app.listen(3000,()=>{
    console.log('server connected\n http://localhost:3000 ');
})
