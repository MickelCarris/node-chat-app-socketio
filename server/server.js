const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const { generateMessage } = require('./utils/message');

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
    console.log('Message', msg);

    io.emit('newMessage', generateMessage(msg.from, msg.text));
    // cb('Hi');
    // socket.broadcast.emit('newMessage', {
    //   from: msg.from,
    //   text: msg.text,
    //   createdAt: new Date().getTime()
    // });
    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
  });
});

server.listen(port, console.log(`Server started at port ${port}`));
