let socket = io();
socket.on('connect', function() {
  console.log('Connected to Server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg) {
  console.log('New Message: ', msg);
  $('#messages').append(
    `<li class="list-group-item mb-1"><b>${msg.from}</b>: ${msg.text}</li>`
  );
  $('#msg').val('');
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: $('[name=msg]').val()
    },
    function() {}
  );
});
