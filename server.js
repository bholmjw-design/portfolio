const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'https://hemasagar.my.to',
    methods: ['GET', 'POST']
  }
});

app.use(express.static(__dirname));

io.on('connection', socket => {
  socket.on('join', user => {
    socket.username = user;
    io.emit('system', `${user} joined the chat`);
  });
  socket.on('chat', data => io.emit('chat', data));
  socket.on('typing', user => socket.broadcast.emit('typing', user));
  socket.on('disconnect', () => {
    if (socket.username) io.emit('system', `${socket.username} left`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));