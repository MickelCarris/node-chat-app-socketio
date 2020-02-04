let socket = io();

socket.on('updateActiveRooms', function(activeRooms) {
  let select = $('<select></select>');
  select.addClass('select');
  activeRooms.forEach(room => {
    select.append(
      $('<option></option>')
        .text(room)
        .val(room)
    );
  });
  $('#activeChat').html(select);

  var sel = document.querySelector('.select');
  var opt = sel.options[sel.selectedIndex].value;

  let roomValue = document.querySelector('#room');
  if (!roomValue.value) {
    roomValue.value = opt;
  }

  sel.addEventListener('change', () => {
    roomValue.value = sel.options[sel.selectedIndex].value;
  });
});
