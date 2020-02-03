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
  li.addClass('mb-1');
  $('#messages').append(li);
});

socket.on('newLocationMessage', function(msg) {
  console.log('New Message: ', msg);
  let li = $('<li></li>');
  let a = $('<a target="_blank">My Current Location</a>');
  // a.css('font-size', '10px');
  li.html(`<b>${msg.from}:</b> `);
  a.attr('href', msg.url);
  li.addClass('mb-1');
  li.append(a);
  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  let msgTextBox = $('#msg');
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: msgTextBox.val()
    },
    function() {
      msgTextBox.val('');
    }
  );
});

let locationBtn = $('#send-location');

locationBtn.on('click', function() {
  if (!navigator.geolocation) {
    return alert('Geo Location not supported by your browser');
  }

  locationBtn.attr('disabled', 'disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });

      locationBtn.removeAttr('disabled').text('Send location');
    },
    function() {
      alert('Unable to fetch location');
      locationBtn.removeAttr('disabled').text('Send location');
    }
  );
});
