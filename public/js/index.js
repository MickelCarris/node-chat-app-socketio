let socket = io();
socket.on('connect', function() {
  console.log('Connected to Server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

socket.on('newMessage', function(msg) {
  const formattedTime = moment(msg.createAt).format('h:mm:ss a');
  let template = $('#message-template').html();

  let html = Mustache.render(template, {
    text: msg.text,
    from: msg.from,
    createdAt: formattedTime
  });

  $('#messages').append(html);
});

socket.on('newLocationMessage', function(msg) {
  const formattedTime = moment(msg.createAt).format('h:mm:ss a');
  const template = $('#location-message-template').html();
  const html = Mustache.render(template, {
    from: msg.from,
    url: msg.url,
    createdAt: formattedTime
  });
  $('#messages').append(html);
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
