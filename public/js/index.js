let socket = io();
socket.on('connect', function() {
  console.log('Connected to Server');

  socket.emit('createMessage', {
    from: 'jen@gmail.com',
    text: 'Hey. Yeah'
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg) {
  console.log('New Message: ', msg);
});
