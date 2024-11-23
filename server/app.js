const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./config/database'); // Ensure this is configured correctly
const passport = require('passport');
const routes = require('./routes/userRoutes');





const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');


app.use(express.static(path.join(__dirname, 'Public')));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 
app.use((req, res, next) => {
    console.log('Cookies:', req.cookies);
    next();
});



app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session configuration
app.use(session({
    store: new PgSession({
        pool: pool,
        tableName: 'sessions' // Use a dedicated table for sessions
    }),
    secret: process.env.SESSION_SECRET || "your-very-secure-secret", // Use an env variable for security
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
    
       
    }
}));


// Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport for session management

// Logging middleware to track requests
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});
// API routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

// Start the server
app.listen(3000, () => {
    console.log('Server connected\n http://localhost:3000');
});
