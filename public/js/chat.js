let socket = io();

function scrollToBottom() {
  // selectors
  let messages = $('#messages');
  let newMessage = messages.last();

  // Heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  // let lastMessageHeight = newMessage.last().innerHeight();

  if (scrollTop + clientHeight + newMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  let params = $.deparam(window.location.search);
  socket.emit('join', params, function(err) {
    if (err) {
      window.location.href = '/';
      alert(err);
    } else {
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from Server');
});

socket.on('updateUsersList', function(users) {
  let ul = $('<ul></ul>');

  users.forEach(user => {
    ul.append($('<li></li>').text(user));
  });

  $('#users').html(ul);
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
  scrollToBottom();
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
  scrollToBottom();
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  let msgTextBox = $('#msg');
  socket.emit(
    'createMessage',
    {
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
