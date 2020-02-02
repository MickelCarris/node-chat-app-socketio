const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, '../public')));

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'johndoe@gmail.com',
    text: 'Hi i am john',
    createdAt: 2233
  });

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });

  socket.on('createMessage', msg => {
    msg.createdAt = new Date();
    console.log('Message', msg);
  });
});

server.listen(port, console.log(`Server started at port ${port}`));
