const express = require('express');
const app = express();
const session = require('express-session');
const connectRedis = require('connect-redis');
const RedisStore = connectRedis(session); // Correctly importing RedisStore with version 6
const Redis = require('ioredis');
const redisClient = new Redis({
    host: 'localhost',
    port: 6379,
    db: 0
});
const passport = require('passport');
const routes = require('./routes/userRoutes');
const socketIO = require('socket.io');
const http = require('http');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Redis client for session and socket.io-redis
redisClient.on('error', (err) => {
    console.error('Redis error: ', err); // Log any Redis connection issues
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Session configuration using RedisStore for version 6
app.use(session({
    store: new RedisStore({ client: redisClient }), // Properly initializing RedisStore with Redis client
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 24 hours
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true
    }
}));

// Passport middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

// API routes
app.use('/api', routes);

// Socket.io server setup with Redis adapter
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true
    }
});

// Socket.io-redis configuration
const socketIORedis = require('socket.io-redis');
io.adapter(socketIORedis({
    host: '127.0.0.1',
    port: 6379
}));

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server with `server.listen()`
server.listen(3000, () => {
    console.log('Server connected\n http://localhost:3000');
});
