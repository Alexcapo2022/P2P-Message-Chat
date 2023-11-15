document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    const form = document.querySelector('form');
    const input = document.querySelector('#m');
    const messages = document.querySelector('#messages');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (input.value) {
        socket.emit('message', { user: 'User', content: input.value });
        input.value = '';
      }
    });
  
    socket.on('message', (data) => {
      const li = document.createElement('li');
      li.textContent = `${data.user}: ${data.content}`;
      messages.appendChild(li);
    });
  
    socket.on('connect', () => {
      console.log('Conectado al servidor de sockets');
    });
  
    socket.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets');
    });
  });
  