const express = require('express');
const session = require('express-session'); // Correct version for v6
const passport = require('passport');
const routes = require('./routes/userRoutes');

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');



const app = express();


// Middleware setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// CORS configuration
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

const {RedisStore} = require("connect-redis");
const { createClient } = require('redis');

const redisClient = createClient({
    socket: {
        host: process.env
            .REDIS_HOST || 'localhost',
        port: process.env.REDIS_PORT || 6379
    }
});


redisClient.connect().catch(console.error);

// Session configuration
app.use(session({ 
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,  // 1 day
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    }
}));

// Passport setup
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api', routes);




// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
