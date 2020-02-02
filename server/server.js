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

  socket.on('disconnect', () => {
    console.log('client disconnected');
  });
});

server.listen(port, console.log(`Server started at port ${port}`));
