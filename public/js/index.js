let socket = io();
socket.on('connect', function() {
  console.log('Connected to Server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg) {
  console.log('New Message: ', msg);
  let li = $('<li></li>');
  li.html(`<b>${msg.from}</b>: ${msg.text}`);
  li.addClass('list-group-item mb-1');
  $('#messages').append(li);
  $('#msg').val('');
});

socket.on('newLocationMessage', function(msg) {
  console.log('New Message: ', msg);
  let li = $('<li></li>');
  let a = $('<a target="_blank">My Current Location</a>');
  // a.css('font-size', '10px');
  a.addClass('badge badge-primary');
  li.html(`<b>${msg.from}:</b> `);
  a.attr('href', msg.url);
  li.addClass('list-group-item mb-1');
  li.append(a);
  $('#messages').append(li);
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

let locationBtn = $('#send-location');

locationBtn.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geo Location not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to fetch location');
    }
  );
});
