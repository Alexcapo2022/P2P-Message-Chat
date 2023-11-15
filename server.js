const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path'); // Agregamos el módulo 'path'
const connectDB = require('./app/database/connectDB');
const Message = require('./app/model/Message');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir el HTML y JavaScript del cliente
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de Socket.IO
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Manejar evento de nuevo mensaje
  socket.on('message', async (data) => {
    try {
      // Guardar el mensaje en la base de datos
      const message = new Message(data);
      await message.save();

      // Reenviar el mensaje a todos los clientes
      io.emit('message', data);
    } catch (error) {
      console.error('Error al guardar el mensaje en la base de datos:', error.message);
    }
  });

  // Manejar evento de desconexión
  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

// Conectar a la base de datos MongoDB
connectDB();

// Ruta para servir la página HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
