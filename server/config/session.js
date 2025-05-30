
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pool = require('./database'); 

const sessionMiddleware = session({ 
    store: new pgSession({
        pool: pool,
        tableName: 'session',
    }),
    secret: '123456', 
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    },
});

module.exports = sessionMiddleware;
