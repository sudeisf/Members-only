const { Server } = require('socket.io');
const sessionMiddleware = require('./session');

let io;

function init(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  // Wrap the express session middleware for socket.io
  const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);
  io.use(wrap(sessionMiddleware));

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Uncomment if you want to debug session in sockets
    // console.log('Socket session:', socket.request.session);

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  return io;
}

function getIO() {
  if (!io) {
    throw new Error('Socket.io not initialized! Call init(server) first.');
  }
  return io;
}

module.exports = { init, getIO };
