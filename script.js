const input = document.querySelector('.input');
const ul = document.querySelector('.messageHistory');

// Создаёт WebSocket - подключение.
const socket = new WebSocket('ws://localhost:8080');

// Соединение открыто
socket.addEventListener('open', function (event) {

});

// Наблюдает за сообщениями
socket.addEventListener('message', function (event) {
  addMessage(event.data);
});

input.addEventListener('keydown', (e) => {
  if (e.key == 'Enter') {
    addMessage(input.value, true)
    socket.send(input.value);
  }

})

function addMessage(value, own) {
  const li = document.createElement('li');
  li.append(value);
  li.style.color = own ? 'green' : 'orange';
  ul.prepend(li);
}