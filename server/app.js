const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const PgSession = require('connect-pg-simple')(session);
const pool = require('./config/database'); 
const passport = require('passport');
const routes = require('./routes/userRoutes');
const socketIO = require('socket.io');
const http = require('http');

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { env } = require('process');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 

app.use(cors({
    origin: process.env.CORS_ORIGIN,
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
        sameSite: 'lax',
        secure: process.env.NODE_ENV,
        httpOnly: true
    }
}));

// Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize()); // Initialize Passport
app.use(passport.session()); // Use Passport for session management

// API routes
app.use('/api', routes);

const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server with `server.listen()`
server.listen(3000, () => {
    console.log('Server connected\n http://localhost:3000');
});
