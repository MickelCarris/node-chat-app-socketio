const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app); // --
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit(
    'newMessage',
    generateMessage('Admin', 'Welcome to the chat app')
  );

  socket.broadcast.emit(
    'newMessage',
    generateMessage('Admin', 'New User Joined')
  );

  socket.on('createMessage', (msg, cb) => {
    io.emit('newMessage', generateMessage(msg.from, msg.text));
    cb();
  });

  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, console.log(`Server started at port ${port}`));
