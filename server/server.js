const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app); // --
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the chat app',
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', msg => {
    console.log('Message', msg);

    io.emit('newMessage', {
      from: msg.from,
      text: msg.text,
      createdAt: new Date().getTime()
    });
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
