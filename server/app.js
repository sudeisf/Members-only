const express = require('express');
const session = require('express-session'); 
const passport = require('passport');
const routes = require('./routes/userRoutes');

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

const pgSession = require('connect-pg-simple')(session);
const pool = require('./config/database');
app.set("trust proxy", 1);

app.use(session({ 
    store: new pgSession({
        pool: pool,
        tableName: 'session'
    }),
    secret: '123456',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, 
        sameSite: process.env.NODE_ENV  ? 'none' : 'lax',
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

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = {app , io}