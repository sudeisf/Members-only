const express = require('express');
const session = require('express-session'); 
const passport = require('passport');
const routes = require('./routes/userRoutes');

const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { init, getIO } = require('./config/socket'); 
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = init(server); 
const sessionMiddleware = require('./config/session')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.CORS_ORIGIN ,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ,'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization' ],
    exposedHeaders: ['X-Custom-Header'],
  }));


app.set("trust proxy", 1);
app.use(sessionMiddleware);




// Passport setup
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());


  
// API routes
app.use('/api', routes);



// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app